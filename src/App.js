import React from 'react';
import './App.css';
import { getTickets } from "./api/server";
import { TicketPreview } from "./components/TicketPreview/TicketPreview";
import { Loading } from "./components/Loading";
import { SortBy } from "./components/SortBy/SortBy";
import { SortingOptions } from "./components/SortingOptions/SortingOptions";

const sorter = (sortBy, tickets) => {
    const allTickets = tickets;
    if (sortBy === 'price') {
        const sortedTicketsByPrice = allTickets
            .sort((a, b) => {
                if (a.price < b.price) {
                    return -1
                }
            });
        return sortedTicketsByPrice
    }
    if (sortBy === 'speed') {
        const sortedTicketsBySpeed = allTickets
            .sort((a, b) => {
                if (a.segments[0].duration < b.segments[0].duration) {
                    return -1
                }
            });
        return sortedTicketsBySpeed
    }
};

const filter = (tickets, transfers) => {

  const filteredTickets = () => {
      let allFilteredTickets = [];

      for (let i = 0; i < transfers.length; i++) {

          let filteredTicketsChunk = tickets.filter(ticket => {

              let isTicketValid = [];

              for (let a = 0; a < ticket.segments.length; a++) {
                  if (ticket.segments[a].stops.length === transfers[i]) {
                      isTicketValid = [...isTicketValid, true]
                  } else {
                      isTicketValid = [...isTicketValid, false]
                  }
              }

              if (!isTicketValid.includes(false)) {
                  return ticket
              }

          });
          allFilteredTickets = [...allFilteredTickets, ...filteredTicketsChunk]

      }

      return allFilteredTickets;
  };

  return filteredTickets();

};

const slicer = stack => stack.slice(0,5);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            sortedAndFilteredTickets: [],
            selectedTransfers: [0,1,2,3],
            isTicketsLoaded: false,
            ticketsToShow: [],
            sortBy: 'price',
        };
    }

    async componentDidMount() {
        const tickets = await getTickets();

        const sortedTickets = sorter(this.state.sortBy, tickets);

        const filteredTickets = sortedTickets;

        const sortedAndFilteredTickets = await sorter(this.state.sortBy, filteredTickets);

        const ticketsToShow = await slicer(sortedAndFilteredTickets);

        await this.setState({
            tickets: sortedTickets,
            filteredTickets,
            isTicketsLoaded: true,
            ticketsToShow
        });
    }

    render() {

        const setSort = async sortBy => {
            await this.setState({ sortBy });
            await rerender();
        };

        const setFilter = async filterOptions => {
            await this.setState({ selectedTransfers: filterOptions });
            await rerender();
        };

        const rerender = async () => {
            const tickets = await sorter(this.state.sortBy, this.state.tickets);
            await this.setState({ tickets });
            const filteredTickets = await filter(this.state.tickets, this.state.selectedTransfers);
            const sortedAndFilteredTickets = await sorter(this.state.sortBy, filteredTickets);
            await this.setState({ sortedAndFilteredTickets });
            const ticketsToShow = await slicer(this.state.sortedAndFilteredTickets);
            await this.setState({ ticketsToShow });
        };

        return (
            <div>
                { this.state.isTicketsLoaded ? null : <Loading/> }
                <div className="main-wrapper">
                    <div className="logo"><img src={require("./assets/logo.svg")} alt=""/></div>
                    <div className="main-content">
                        <SortingOptions setFilter={setFilter} />
                        <div>
                            <SortBy setSort={setSort} />
                            <div>{
                                this.state.ticketsToShow.map((ticket, index) => {
                                    return <TicketPreview ticket={ticket} key={index} />
                                })
                            }</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
