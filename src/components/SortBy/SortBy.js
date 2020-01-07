import React from "react";
import './SortBy.css'

export class SortBy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'price'
        };
    }

    render() {

        const button = (side, sortBy) => {
            let firstButton = `sort-button sort-button-${side}`;
            if (this.state.sortBy === sortBy) {
                firstButton += ' sort-button--active'
            }
            return firstButton;
        };

        const setSorting = (sortBy) => {
            this.setState({sortBy});
            this.props.setSort(sortBy)
        };

        return (
            <div className="sort-by">
                <div className={button('left', 'price')} onClick={() => setSorting('price')}>Самый дешевый</div>
                <div className={button('right', 'speed')} onClick={() => setSorting('speed')}>Самый быстрый</div>
            </div>
        )
    }
}