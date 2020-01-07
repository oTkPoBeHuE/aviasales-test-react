import React from "react";
import '../../App.css'
import { SegmentLine } from "./SegmentLine";

export const TicketPreview = function(props) {

    const ticketPrice = function() {
        const price = props.ticket.price;

        return price.toLocaleString()
    };

    return (
        <div className="ticket">
            <div className="ticket-header">
                <div className="ticket-price">{ `${ticketPrice()}Р` }</div>
                <img src={`https://pics.avs.io/99/36/${props.ticket.carrier}.png`} alt=""/>
            </div>
            <div className="ticket-content">
                {
                    props.ticket.segments.map((segment, index, arr) => {
                        if (arr.length - 1 !== index) {
                            return <SegmentLine isLast={false} segment={segment} key={index} />
                        }
                        return <SegmentLine isLast={true} segment={segment} key={index} />
                    })
                }
            </div>
        </div>
    )
};