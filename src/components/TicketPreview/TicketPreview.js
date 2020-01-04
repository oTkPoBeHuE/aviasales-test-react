import React from "react";
import '../../App.css'
import { SegmentLine } from "./SegmentLine";

export const TicketPreview = function(props) {
    return (
        <div className="ticket">
            <div className="ticket-header">
                <div className="ticket-price">{ props.ticket.price } Р</div>
                <img src={`https://pics.avs.io/99/36/${props.ticket.carrier}.png`} alt=""/>
            </div>
            <div className="ticket-content">
                {
                    props.ticket.segments.map((segment, index) => <SegmentLine segment={segment} key={index} />)
                }
            </div>
        </div>
    )
};