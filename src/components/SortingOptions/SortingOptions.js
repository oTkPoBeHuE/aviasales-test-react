import React from "react";
import './SortingOptions.css';

const Checkbox = function (props) {

    const checkbox = () => {
        let style = 'checkbox';
        if (props.active) {
            style += ' checkbox--active'
        }
        return style
    };
    const checkMark = () => {
        let style = 'check-mark';
        if (props.active) {
            style += ' check-mark--active'
        }
        return style
    };

    return (
        <div className={checkbox()}>
            <img className={checkMark()} src={require("../../assets/check-mark.svg")} alt=""/>
        </div>
    )

};

export class SortingOptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkboxes: [
                {
                    id: 0,
                    isActive: true,
                    text: 'Все',
                    transfers: 0
                },
                {
                    id: 1,
                    isActive: false,
                    text: 'Без пересадок',
                    transfers: 0,
                },
                {
                    id: 2,
                    isActive: false,
                    text: 'Одна пересадка',
                    transfers: 1,
                },
                {
                    id: 3,
                    isActive: false,
                    text: 'Две персадки',
                    transfers: 2
                },
                {
                    id: 4,
                    isActive: false,
                    text: 'Три пересадки',
                    transfers: 3
                },
            ]
        };
    }

    render() {

        const switchCheckbox = index => {
            let checkboxes = this.state.checkboxes;
            const checkboxIndex = this.state.checkboxes.findIndex(checkbox => checkbox.id === index);
            let isSelectedAll = false;

            const selectAllCheckbox = () => {
                isSelectedAll = true;
                checkboxes = checkboxes.map(checkbox => {
                    return {
                        id: checkbox.id,
                        isActive: checkbox.id === 0,
                        text: checkbox.text,
                        transfers: checkbox.transfers
                    }
                })
            };

            if (checkboxIndex !== 0) {
                checkboxes[0].isActive = false;
                checkboxes[checkboxIndex].isActive = !checkboxes[checkboxIndex].isActive;
            } else {
                selectAllCheckbox();
            }

            const isSelectedOneCheckbox = checkboxes.find(checkbox => checkbox.isActive);

            if (!isSelectedOneCheckbox) {
                selectAllCheckbox();
            }

            this.setState({checkboxes});

            const filterOptions = this.state.checkboxes
                .map(checkbox => {
                    if (checkbox.isActive) {
                        return checkbox.transfers
                    }
                    return null
                })
                .filter(checkbox => checkbox !== null);

            this.props.setFilter( isSelectedAll ? [0,1,2,3] : filterOptions );
        };

        return (
            <div className="sorting-options">
                <div className="sorting-options-heading">Количество пересадок</div>
                <div>
                    {
                        this.state.checkboxes.map((checkbox, index) => {
                            return (
                                <div className="label" onClick={() => switchCheckbox(index)} key={index}>
                                    <Checkbox active={checkbox.isActive} />
                                    <div className="label-text">{checkbox.text}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}