import './style.scss';
import React from 'react';
import {ReactComponent as IconChecked} from './assets/checked.svg';
import {ReactComponent as IconClose} from './assets/close.svg';
import {ReactComponent as IconPlus} from './assets/plus.svg';
import {Button} from '../../components/Button';
import {API_URL} from "../../constants";
import {connect} from "react-redux";
import * as actions from "../../actions";

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

    componentDidUpdate(prevProps) {
        const nextProps = this.props.currentDate;
        if (prevProps.currentDate !== nextProps) {
            this.props.store.dispatch(actions.setScheduleFormData({
                startDate: nextProps,
                endDate: nextProps,
            }));
        }
    }

    addTimeInput() {
        const timeList = this.props.timeList;

        timeList.push('09:00');
        this.props.store.dispatch(actions.setScheduleFormData({timeList: timeList}));
    }

    onSelectWeekDay(e) {
        const id = e.target.id;

        this.props.store.dispatch(actions.setScheduleFormData({
            weekDays: {
                ...this.props.weekDays,
                [id]: !this.props.weekDays[id]
            }
        }));
    }

    changeDate(e) {
        const target = e.target;

        this.props.store.dispatch(actions.setScheduleFormData({[target.id]: target.value}));
    }

    onChangeTime(e, i) {
        const timeList = [...this.props.timeList];
        timeList[i] = e.target.value;
        this.props.store.dispatch(actions.setScheduleFormData({timeList: timeList}));
    }

    removeTime() {
        const timeList = [...this.props.timeList];
        timeList.splice(this.props.selectedTimeIndex, 1);

        this.props.store.dispatch(actions.setScheduleFormData({
            selectedTimeIndex: null,
            timeList: timeList
        }));
    }

    createAppointments() {
        const endDate = new Date(this.props.endDate);
        const appointments = [];
        const weekDays = Object.values(this.props.weekDays);
        let date = new Date(this.props.startDate);

        for (date; endDate >= date; date.setUTCDate(date.getUTCDate() + 1)) {
            if (weekDays[date.getUTCDay()]) {
                appointments.push({
                    date: date.toISOString().split('T')[0],
                    timeList: this.props.timeList.map((time) => {
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

    unSelectTime(e) {
        if (!e.target.classList.contains('schedule-form__input-time')) {
            this.props.store.dispatch(actions.setScheduleFormData({selectedTimeIndex: null}));
            document.removeEventListener('click', this.unSelectTime);
        }
    }

    render() {
        const timeList = this.props.timeList.map((el, i) => {
                const isSelectedTime = this.props.selectedTimeIndex === i;
                const inputBaseClass = 'schedule-form__input-time';
                const inputClass = isSelectedTime ? `${inputBaseClass} ${inputBaseClass}--selected` : inputBaseClass;
                return <input className={inputClass} type="time" value={el} key={i}
                              onChange={(e) => {
                                  this.onChangeTime(e, i);
                              }}
                              onFocus={() => {
                                  this.props.store.dispatch(actions.setScheduleFormData({selectedTimeIndex: i}));

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
                    {(this.props.selectedTimeIndex === null) ? false : (
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
                               value={this.props.startDate}
                               id='startDate' onChange={this.changeDate} min={this.props.currentDate}/>
                    </span>
                    <span>till
                        <input className="schedule-form__input-date" type="date"
                               value={this.props.endDate}
                               id='endDate' onChange={this.changeDate} min={this.props.startDate}/>
                    </span>
                </div>
                <div className="schedule-form__week-days">
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="mon" value={this.props.weekDays.mon}/>
                        <span className="schedule-form__day-name">mon</span>
                        <span className="schedule-form__day-checkbox">
                            {this.props.weekDays.mon ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="tue" value={this.props.weekDays.tue}/>
                        <span className="schedule-form__day-name">tue</span>
                        <span className="schedule-form__day-checkbox">
                            {this.props.weekDays.tue ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="wed" value={this.props.weekDays.wed}/>
                        <span className="schedule-form__day-name">wed</span>
                        <span className="schedule-form__day-checkbox">
                            {this.props.weekDays.wed ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="thu" value={this.props.weekDays.thu}/>
                        <span className="schedule-form__day-name">thu</span>
                        <span className="schedule-form__day-checkbox">
                           {this.props.weekDays.thu ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="fri" value={this.props.weekDays.fri}/>
                        <span className="schedule-form__day-name">fri</span>
                        <span className="schedule-form__day-checkbox">
                            {this.props.weekDays.fri ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="sat" value={this.props.weekDays.sat}/>
                        <span className="schedule-form__day-name">sat</span>
                        <span className="schedule-form__day-checkbox">
                            {this.props.weekDays.sat ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
                        </span>
                    </label>
                    <label className="schedule-form__day-label">
                        <input className="schedule-form__day-input" onChange={this.onSelectWeekDay} type="checkbox"
                               id="sun" value={this.props.weekDays.sun}/>
                        <span className="schedule-form__day-name">sun</span>
                        <span className="schedule-form__day-checkbox">
                          {this.props.weekDays.sun ? <IconChecked className='schedule-form__chekbox-icon'/> : false}
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

const mapStateToProps = state => {
    return {
        startDate: state.scheduleFormReducer.startDate,
        endDate: state.scheduleFormReducer.endDate,
        weekDays: state.scheduleFormReducer.weekDays,
        timeList: state.scheduleFormReducer.timeList,
        selectedTimeIndex: state.scheduleFormReducer.selectedTimeIndex,
    };
};

export default connect(mapStateToProps)(ScheduleForm);
