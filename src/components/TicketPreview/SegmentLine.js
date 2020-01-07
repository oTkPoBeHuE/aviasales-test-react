import React from "react";

export const SegmentLine = function(props) {

    const corrector = function(num) {
        if (num < 10) {
            return `0${num}`
        }
        return num
    };

    const trackStartTime = function() {
        const startDate = new Date(props.segment.date);

        let startHours = startDate.getHours();
        let startMinutes = startDate.getMinutes();
        startHours = corrector(startHours);
        startMinutes = corrector(startMinutes);

        const startTime = `${startHours}:${startMinutes}`;
        return startTime;
    };

    const trackEndTime = function() {
        const trackStartInMs = Date.parse(props.segment.date);
        const trackDurationInMs = props.segment.duration * 60 * 1000;
        const trackEndInMs = trackStartInMs + trackDurationInMs;
        const endDate = new Date(trackEndInMs);

        let endHours = endDate.getHours();
        let endMinutes = endDate.getMinutes();
        endHours = corrector(endHours);
        endMinutes = corrector(endMinutes);

        const endTime = `${endHours}:${endMinutes}`;
        return endTime
    };

    const trackDuration = function() {
        const durationInMinutes = props.segment.duration;

        let durationHours = Math.trunc(durationInMinutes / 60);
        let durationMinutes = durationInMinutes % 60;

        durationHours = corrector(durationHours);
        durationMinutes = corrector(durationMinutes);

        const duration = `${durationHours}ч ${durationMinutes}м`;

        return duration;
    };

    const transfersCounterHeading = function() {
        const transfersCounter = props.segment.stops.length;
        if (transfersCounter === 0) {
            return 'Без пересадок'
        }
        if (transfersCounter === 1) {
            return `${transfersCounter} пересадка`
        }
        if (transfersCounter === 2 || transfersCounter === 3 || transfersCounter === 4) {
            return `${transfersCounter} пересадки`
        }
        return `${transfersCounter} пересадок`
    };

    const marginBottom = () => {
        if (props.isLast) {
            return {
                marginBottom: '0'
            }
        }
        return {
            marginBottom: '10px'
        };
    };

    return (
        <div className="segment-line" style={marginBottom()}>
            <div className="segment-col">
                <div className="ticket-heading">{`${props.segment.origin} - ${props.segment.destination}`}</div>
                <div className="ticket-text">{ `${ trackStartTime() } - ${ trackEndTime() }` }</div>
            </div>
            <div className="segment-col">
                <div className="ticket-heading">В пути</div>
                <div className="ticket-text">{ trackDuration() }</div>
            </div>
            <div className="segment-col">
                <div className="ticket-heading">{ transfersCounterHeading() }</div>
                <div className="ticket-text">{
                    (props.segment.stops.length > 0) ?
                        props.segment.stops.map((stop, index, arr) => {
                            if (arr.length - 1 !== index) {
                                return <span key={index}>{stop}, </span>
                            }
                            return <span key={index}>{stop}</span>
                        }) : <span>-</span>
                }</div>
            </div>
        </div>

    )
};