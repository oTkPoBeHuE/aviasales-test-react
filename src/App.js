import React from 'react';
import './App.css';
import { getTickets } from "./api/server";
import { TicketPreview } from "./components/TicketPreview/TicketPreview";
import { Loading } from "./components/Loading";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            isTicketsLoaded: false,
            ticketsToShow: []
        };
    }

    async componentDidMount() {
        const tickets = await getTickets();
        const ticketsToShow = tickets.slice(0,5);
        await this.setState({
            tickets: tickets,
            isTicketsLoaded: true,
            ticketsToShow
        });
    }

    render() {
        return (
            <div>{this.state.isTicketsLoaded ?
                <div>
                    <div>{
                        this.state.ticketsToShow.map((ticket, index) => {
                            return <TicketPreview ticket={ticket} key={index} />
                        }).slice(0,5)
                    }</div>
                </div> : <Loading />
            }</div>
        );
    }
}

export default App;
