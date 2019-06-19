import './style.scss';
import React from 'react';
import {ReactComponent as IconChecked} from './assets/checked.svg';
import {ReactComponent as IconClose} from './assets/close.svg';
import {ReactComponent as IconPlus} from './assets/plus.svg';
import {Button} from '../Button';
import {AppointmentTime} from '../AppointmentTime';

class ScheduleForm extends React.Component {
    constructor(props) {
        super(props);

        this.addTimeInput = this.addTimeInput.bind(this);
        this.removeTimeInput = this.removeTimeInput.bind(this);
        this.onSelectWeekDay = this.onSelectWeekDay.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }

    state = {
        startDate: this.currentDate,
        endDate: this.currentDate,
        weekDays: {
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: false,
            sun: false,
        },
        timeList: [<AppointmentTime key={Date.now()}/>],
        selectedTime: null,
    };

    addTimeInput() {
        const timeList = this.state.timeList;

        timeList.push(<AppointmentTime key={Date.now()}/>);
        this.setState({timeList: timeList});
    }

    removeTimeInput(e) {
        console.log('remove');
    }

    onSelectWeekDay(e) {
        const id = e.target.id;

        this.setState({
            weekDays: {
                ...this.state.weekDays,
                [id]: !this.state.weekDays[id]
            }
        });
    }

    changeDate(e) {
        const target = e.target;

        this.setState({[target.id]: target.value});
    }

    get currentDate() {
        return new Date(Date.now()).toISOString().split('T')[0];
    }

    render() {
        console.log(this.state.timeList);
        return (
            <section className="schedule-form">
                <h2 className="schedule-form__header">
                    This time list will be added to calendar
                </h2>
                <div className="schedule-form__time-list">
                    {this.state.timeList}
                </div>
                <div className={'schedule-form__btns-wrapper'}>
                    {this.state.isSelectedTime ? (
                        <Button title={'Remove selected'} type={'danger'} action={this.removeTimeInput}
                                text={<IconClose className='schedule-form__btn-icon schedule-form__btn-icon--minus'/>}
                        />) : false}
                    <Button title={'Add more'} type={'success'} action={this.addTimeInput}
                            text={<IconPlus className='schedule-form__btn-icon schedule-form__btn-icon--plus'/>}
                    />
                </div>
                <div className="schedule-form__presets schedule-form__presets--time">
                    <span>From
                        <input className="schedule-form__input-date" type="date" value={this.state.startDate}
                               id='startDate' onChange={this.changeDate} min={this.currentDate}/>
                    </span>
                    <span>till
                        <input className="schedule-form__input-date" type="date" value={this.state.endDate}
                               id='endDate' onChange={this.changeDate} min={this.state.startDate}/>
                    </span>
                </div>
                <div className="schedule-form__week-days">
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="mon" value={this.state.weekDays.mon}/>
                        <span className="schedule-form__day-name">mon</span>
                        <span className="schedule-form__day-checkbox">
                            {this.state.weekDays.mon ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="tue" value={this.state.weekDays.tue}/>
                        <span className="schedule-form__day-name">tue</span>
                        <span className="schedule-form__day-checkbox">
                            {this.state.weekDays.tue ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="wed" value={this.state.weekDays.wed}/>
                        <span className="schedule-form__day-name">wed</span>
                        <span className="schedule-form__day-checkbox">
                            {this.state.weekDays.wed ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="thu" value={this.state.weekDays.thu}/>
                        <span className="schedule-form__day-name">thu</span>
                        <span className="schedule-form__day-checkbox">
                           {this.state.weekDays.thu ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="fri" value={this.state.weekDays.fri}/>
                        <span className="schedule-form__day-name">fri</span>
                        <span className="schedule-form__day-checkbox">
                            {this.state.weekDays.fri ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="sat" value={this.state.weekDays.sat}/>
                        <span className="schedule-form__day-name">sat</span>
                        <span className="schedule-form__day-checkbox">
                            {this.state.weekDays.sat ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="sun" value={this.state.weekDays.sun}/>
                        <span className="schedule-form__day-name">sun</span>
                        <span className="schedule-form__day-checkbox">
                          {this.state.weekDays.sun ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                </div>
                <div className="schedule-form__btns-wrapper">
                    <button className="btn btn--danger">
                        Cancel
                    </button>
                    <button className="btn btn--success">
                        Add to calendar
                    </button>
                </div>
            </section>
        );
    }
}

export {ScheduleForm};
