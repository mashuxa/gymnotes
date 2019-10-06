import './style.scss';
import React from 'react';
import {ReactComponent as IconChecked} from './assets/checked.svg';
import {ReactComponent as IconClose} from './assets/close.svg';
import {ReactComponent as IconPlus} from './assets/plus.svg';
import {Button} from '../Button';
import {API_URL} from "../../constants";

class ScheduleForm extends React.Component {
    constructor(props) {
        super(props);

        this.addTimeInput = this.addTimeInput.bind(this);
        this.removeTime = this.removeTime.bind(this);
        this.onSelectWeekDay = this.onSelectWeekDay.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.updateTimeList = this.updateTimeList.bind(this);
        this.unSelectTime = this.unSelectTime.bind(this);
    }

    state = {
        startDate: this.props.currentDate,
        endDate: this.props.currentDate,
        weekDays: {
            sun: true,
            mon: true,
            tue: true,
            wed: true,
            thu: true,
            fri: true,
            sat: true,
        },
        timeList: ['09:00'],
        selectedTimeIndex: null,
    };

    componentDidUpdate(prevProps) {
        const nextProps = this.props.currentDate;
        if (prevProps.currentDate !== nextProps) {
            this.setState({
                startDate: nextProps,
                endDate: nextProps,
            });
        }
    }

    addTimeInput() {
        const timeList = this.state.timeList;

        timeList.push('09:00');
        this.setState({timeList: timeList});
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

    onChangeTime(e, i) {
        const timeList = [...this.state.timeList];
        timeList[i] = e.target.value;
        this.setState({timeList: timeList});
    }

    removeTime() {
        const timeList = [...this.state.timeList];
        timeList.splice(this.state.selectedTimeIndex, 1);

        this.setState({
            selectedTimeIndex: null,
            timeList: timeList
        });
    }

    createAppointments() {
        const endDate = new Date(this.state.endDate);
        const appointments = [];
        const weekDays = Object.values(this.state.weekDays);
        let date = new Date(this.state.startDate);

        for (date; endDate >= date; date.setUTCDate(date.getUTCDate() + 1)) {
            if (weekDays[date.getUTCDay()]) {
                appointments.push({
                    date: date.toISOString().split('T')[0],
                    timeList: this.state.timeList.map((time) => {
                        return {
                            time: time,
                            bookedBy: null,
                        };
                    }),
                });
            }
        }

        return appointments;
    }

    showError(e) {
        console.error('Error: ', e);
    }

    updateTimeList = () => {
        const url = `${API_URL}/calendar`;
        const timeList = this.createAppointments();

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(timeList),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.props.onUpdateTimeList();
            } else {
                this.showError(result);
            }
        });

        return timeList;
    };

    unSelectTime(e){
        if(!e.target.classList.contains('schedule-form__input-time')){
            this.setState({selectedTimeIndex: null});
            document.removeEventListener('click', this.unSelectTime);
        }
    }

    render() {
        const timeList = this.state.timeList.map((el, i) => {
                const isSelectedTime = this.state.selectedTimeIndex === i;
                const inputBaseClass = 'schedule-form__input-time';
                const inputClass = isSelectedTime ? `${inputBaseClass} ${inputBaseClass}--selected` : inputBaseClass;
                return <input className={inputClass} type="time" value={el} key={i}
                              onChange={(e) => {
                                  this.onChangeTime(e, i);
                              }}
                              onFocus={() => {
                                  this.setState({selectedTimeIndex: i});
                                  document.addEventListener('click', this.unSelectTime);
                              }}
                />
            }
        );

        return (
            <section className="schedule-form">
                <h2 className="schedule-form__header">
                    This time list will be added to calendar
                </h2>
                <div className="schedule-form__time-list">
                    {timeList}
                </div>
                <div className={'schedule-form__btns-wrapper'}>
                    {(this.state.selectedTimeIndex === null) ? false : (
                        <Button title={'Remove selected'} type={'danger'} action={this.removeTime}
                                text={<IconClose className='schedule-form__btn-icon schedule-form__btn-icon--delete'/>}
                        />)}
                    <Button title={'Add more'} type={'success'} action={this.addTimeInput}
                            text={<IconPlus className='schedule-form__btn-icon schedule-form__btn-icon--plus'/>}
                    />
                </div>
                <div className="schedule-form__presets schedule-form__presets--time">
                    <span>From
                        <input className="schedule-form__input-date" type="date"
                               value={this.state.startDate}
                               id='startDate' onChange={this.changeDate} min={this.props.currentDate}/>
                    </span>
                    <span>till
                        <input className="schedule-form__input-date" type="date"
                               value={this.state.endDate}
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
                    <button className="btn btn--success" onClick={this.updateTimeList}>
                        Add to calendar
                    </button>
                </div>
            </section>
        );
    }
}

export {ScheduleForm};
