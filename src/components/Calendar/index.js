import './style.scss';
import React from 'react';
import {ReactComponent as IconArrowLeft} from './assets/arrow-left.svg';
import {ReactComponent as IconArrowRight} from './assets/arrow-right.svg';
import CalendarDay from '../CalendarDay';
import {Preloader} from "../Preloader";

class Calendar extends React.Component {
    state = {
        date: this.currentDate,
    };

    constructor(props) {
        super(props);

        this.weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        this.month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        this.prevMonth = this.prevMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.onClickDay = this.onClickDay.bind(this);
    }

    componentDidMount() {
        this.updateDates();
        this.props.onChangeMonth(this.formatDate(this.state.date));
    }

    get currentDate() {
        return new Date(Date.now());
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    get firstMonthDay() {
        return new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 1);
    }

    get countEmptyDays() {
        return this.firstMonthDay.getDay();
    }

    get countMonthDays() {
        return new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1, 0).getDate();
    }

    get countDaysFirstWeek() {
        return this.weekDays.length - this.countEmptyDays;
    }

    get dayNames() {
        return this.weekDays.map((dayName, i) => {
            return <th className="calendar__th" key={i}>{dayName}</th>;
        });
    }

    get countEmptyDaysFirstWeek() {
        const days = [];

        for (let i = 0; i < this.countEmptyDays; i++) {
            days.push(<td key={i}></td>);
        }
        return days;
    }

    isExistTime(i) {
        const dates = this.props.listExistingDates;

        return dates && dates.find((el) => {
            return Boolean(Number(el) === i);
        });
    }

    get daysFirstWeek() {
        const days = [];

        for (let i = 1; i <= this.countDaysFirstWeek; i++) {
            days.push(<CalendarDay key={i} date={i} isSelected={i === this.state.date.getDate()}
                                   isExistTime={this.isExistTime(i)} onClickDay={this.onClickDay}/>);
        }

        return days;
    }

    get restDays() {
        const weeks = [];
        const days = [];

        for (let i = this.countDaysFirstWeek + 1; i <= this.countMonthDays; i++) {
            days.push(<CalendarDay key={i} date={i} isSelected={i === this.state.date.getDate()}
                                   isExistTime={this.isExistTime(i)} onClickDay={this.onClickDay}/>);
        }

        while (days.length) {
            const week = days.splice(0, this.weekDays.length);

            weeks.push(<tr key={weeks.length + 1}>{week}</tr>);
        }

        return weeks;
    }

    updateDates(newDate) {
        const date = this.formatDate(newDate || this.state.date);
        const currentDate = this.formatDate(this.currentDate);
        this.props.onChangeDate(date, currentDate);
    }

    onClickDay(e) {
        const selectedDate = new Date(this.state.date.setDate(e.target.dataset.date));

        this.setState({date: selectedDate});
        this.updateDates();
    }

    changeMonth(n) {
        const date = this.state.date;
        const newDate = new Date(date);

        newDate.setMonth(date.getMonth() + 1 * n);
        this.updateDates(newDate);
        this.setState({
            date: newDate,
            listExistingDates: [],
        });
        this.props.onChangeMonth(this.formatDate(newDate));
    }

    prevMonth() {
        this.changeMonth(-1);
    }

    nextMonth() {
        this.changeMonth(1);
    }

    render() {
        return (
            <table className="calendar">
                <thead className="calendar__thead">
                <tr>
                    <th className="calendar__header" colSpan="7">
                        <div className="calendar__header-wrapper">
                            <IconArrowLeft className='calendar__btn calendar__btn--left' onClick={this.prevMonth}/>
                            {this.props.isLoading ? <Preloader/> : <span className="calendar__month">
                                <span>{this.month[this.state.date.getMonth()]} </span>
                                <sup>{this.state.date.getFullYear()}</sup>
                            </span>}
                            <IconArrowRight className='calendar__btn calendar__btn--right' onClick={this.nextMonth}/>
                        </div>
                    </th>
                </tr>
                <tr>
                    {this.dayNames}
                </tr>
                </thead>
                <tbody className="calendar__tbody">
                <tr>
                    {this.countEmptyDaysFirstWeek}
                    {this.daysFirstWeek}
                </tr>
                {this.restDays}
                </tbody>
            </table>
        );
    }
}

export {Calendar};
