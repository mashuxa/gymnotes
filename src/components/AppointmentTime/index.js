import './style.scss';
import React from 'react';

class AppointmentTime extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeTime = this.onChangeTime.bind(this);
        this.onFocusTime = this.onFocusTime.bind(this);
        this.onBlurTime = this.onBlurTime.bind(this);
    }

    state = {
        date: null,
        time: '00:00',
        bookedByUserId: null
    };

    onChangeTime(e) {
        this.setState({time: e.target.value});
    }
    onFocusTime(e) {
        // this.setState({time: e.target.value});
    }
    onBlurTime(e) {
        // this.setState({time: e.target.value});
    }

    render() {
        return (
            <input className="schedule-form__input-time" type="time" value={this.state.time}
                   onFocus={this.onFocusTime} onBlur={this.onBlurTime} onChange={this.onChangeTime}
            />
        );

    }
}

export {AppointmentTime};
