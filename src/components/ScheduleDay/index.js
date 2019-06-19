import './style.scss';
import React from 'react';
import {Button} from "../Button";

class ScheduleDay extends React.Component {
    state = {
        date: '',
        time: '',
        bookedBy: null,
    };

    render() {
        const className = this.bookedBy ? 'schedule-day schedule-day--available' : 'schedule-day--available';
        return (
            <span className={className}>{this.state.time}</span>
        );
    }
}

export {ScheduleDay};
