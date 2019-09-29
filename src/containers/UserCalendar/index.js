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
    }

    state = {
        userData: null,
        listExistingDates: [],
        selectedDate: null,
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
        // console.log("updateDate", date);
    }

    updateListExistingDates(month) {
        // console.log("updateListExistingDates", month);
    }

    render() {
        return !this.state.userData ? <Preloader/> : <div className='user-calendar'>
            <ContractorCard isHiddenLink={true} data={this.state.userData}/>
            <Calendar onChangeDate={this.updateDate} onChangeMonth={this.updateListExistingDates}
                      listExistingDates={this.state.listExistingDates}/>
            {this.state.selectedDate && <AppointmentsList id={this.state.userData.id} date={this.state.selectedDate}/>}
        </div>;
    }
}

export {UserCalendar};
