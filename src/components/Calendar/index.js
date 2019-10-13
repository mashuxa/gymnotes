import './style.scss';
import React from 'react';
import {ReactComponent as IconArrowLeft} from './assets/arrow-left.svg';
import {ReactComponent as IconArrowRight} from './assets/arrow-right.svg';
import CalendarDay from '../../components/CalendarDay';
import {Preloader} from "../../components/Preloader";

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.date = new Date(this.props.date);

        this.weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        this.month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        this.prevMonth = this.prevMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.onClickDay = this.onClickDay.bind(this);
    }

    get firstMonthDay() {
        return new Date(this.date.getUTCFullYear(), this.date.getUTCMonth(), 1);
    }

    get countEmptyDays() {
        return this.firstMonthDay.getUTCDay();
    }

    get countMonthDays() {
        return new Date(this.date.getUTCFullYear(), this.date.getUTCMonth() + 1, 0).getUTCDate();
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

    get daysFirstWeek() {
        const days = [];

        for (let i = 1; i <= this.countDaysFirstWeek; i++) {
            days.push(<CalendarDay key={i} date={i} isSelected={i === this.date.getUTCDate()}
                                   isExistTime={this.isExistTime(i)} onClickDay={this.onClickDay}/>);
        }

        return days;
    }

    get restDays() {
        const weeks = [];
        const days = [];

        for (let i = this.countDaysFirstWeek + 1; i <= this.countMonthDays; i++) {
            days.push(<CalendarDay key={i} date={i} isSelected={i === this.date.getUTCDate()}
                                   isExistTime={this.isExistTime(i)} onClickDay={this.onClickDay}/>);
        }

        while (days.length) {
            const week = days.splice(0, this.weekDays.length);

            weeks.push(<tr key={weeks.length + 1}>{week}</tr>);
        }

        return weeks;
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    isExistTime(i) {
        const dates = this.props.listExistingDates;

        return dates && dates.find((el) => {
            return Boolean(Number(el) === i);
        });
    }

    onClickDay(e) {
        this.date.setUTCDate(e.target.dataset.date);
        this.props.onChangeDate(this.formatDate(this.date));
    }

    changeMonth(n) {
        this.date.setUTCMonth(this.date.getUTCMonth() + 1 * n);
        this.props.onChangeMonth(this.formatDate(this.date));
    }

    prevMonth() {
        this.changeMonth(-1);
    }

    nextMonth() {
        this.changeMonth(1);
    }

    render() {
        const month = this.month[this.date.getUTCMonth()];
        const year = this.date.getUTCFullYear();
        return (
            <table className="calendar">
                <thead className="calendar__thead">
                <tr>
                    <th className="calendar__header" colSpan="7">
                        <div className="calendar__header-wrapper">
                            <IconArrowLeft className='calendar__btn calendar__btn--left' onClick={this.prevMonth}/>
                            {this.props.isLoading ? <Preloader/> : <span className="calendar__month">
                                <span>{month}</span>
                                <sup>{year}</sup>
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
