import React from 'react';
import './style.scss';
import {Preloader} from '../../components/Preloader';
import {ContractorCard} from '../../components/ContractorCard';
import {Calendar} from '../../components/Calendar';
import {AppointmentsList} from '../../components/AppointmentsList';
import {API_URL} from "../../constants";

class UserCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.updateDate = this.updateDate.bind(this);
        this.updateListExistingDates = this.updateListExistingDates.bind(this);
    }

    state = {
        userData: null,
        listExistingDates: [],
        selectedDate: null,
        isCalendarLoading: true,
    };

    componentDidMount() {
        this.getUserData();
    }

    getUserData() {
        fetch(`${API_URL}/user/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result) {
                this.setState({
                    userData: result.data
                });
            } else {
                console.error('Error 1');
            }
        });
    }

    updateDate(date) {
        this.setState({selectedDate: date});
    }

    updateListExistingDates(date = this.state.selectedDate) {
        const url = `${API_URL}/calendar/get-month-dates`;

        this.setState({
            listExistingDates: [],
        });

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: this.state.userData.id,
                date,
            }),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.setState({
                    listExistingDates: result.data,
                    isCalendarLoading: false,
                });
            } else {
                console.error(`Access denied! ${result.message}`);
                this.props.history.push('/login');
            }
        });
    }

    render() {
        return this.state.userData ? <div className='user-calendar'>
            <ContractorCard isHiddenLink={true} data={this.state.userData}/>
            <Calendar onChangeDate={this.updateDate} onChangeMonth={this.updateListExistingDates}
                      listExistingDates={this.state.listExistingDates}/>
            {this.state.selectedDate &&
            <AppointmentsList id={this.state.userData.id} date={this.state.selectedDate}
                              onBookTime={this.updateListExistingDates}/>}
        </div> : <Preloader/>;
    }
}

export {UserCalendar};
