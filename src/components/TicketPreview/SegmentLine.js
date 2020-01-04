import React from "react";

export const SegmentLine = function(props) {
    let date = new Date(props.segment.date);
    let startTime = `${date.getHours()}:${date.getMinutes()}`;

    return (
        <div className="segment-line">
            <div>
                <div className="ticket-heading">{`${props.segment.origin} - ${props.segment.destination}`}</div>
                <div className="ticket-text">{ startTime }</div>
            </div>
            <div>
                <div className="ticket-heading">В пути</div>
                <div>{props.segment.duration}</div>
            </div>
            <div>
                <div className="ticket-heading">{props.segment.stops.length}</div>
                <div className="ticket-heading">{ props.segment.stops.map((stop, index) => <span key={index}>{stop}</span>) }</div>
            </div>
        </div>

    )
};