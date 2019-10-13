import React from 'react';
import './style.scss';
import {Preloader} from '../../components/Preloader';
import {ContractorCard} from '../../components/ContractorCard';
import {Calendar} from '../../components/Calendar';
import AppointmentsList from '../AppointmentsList';
import {API_URL} from "../../constants";
import {connect} from "react-redux";
import * as actions from "../../actions";
import {withRouter} from "react-router-dom";

class ContractorCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.updateDate = this.updateDate.bind(this);
        this.updateListExistingDates = this.updateListExistingDates.bind(this);
    }

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
            if (result.success) {
                this.props.store.dispatch(actions.setContractorCalendarData({
                    userData: result.data
                }));
                this.updateListExistingDates();
            } else {
                console.error('Error 1');
            }
        });
    }

    updateDate(date) {
        this.props.store.dispatch(actions.setContractorCalendarData({date}));
    }

    updateListExistingDates(date = this.props.date) {
        const url = `${API_URL}/calendar/get-month-dates`;

        this.props.store.dispatch(actions.setContractorCalendarData({
            listExistingDates: [],
        }));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: this.props.userData.id,
                date,
            }),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.props.store.dispatch(actions.setContractorCalendarData({
                    listExistingDates: result.data,
                    isCalendarLoading: false,
                }));
            } else {
                console.error(`Access denied! ${result.message}`);
                this.props.history.push('/login');
            }
        });
    }

    render() {
        return this.props.userData ? <div className='user-calendar'>
            <ContractorCard isHiddenLink={true} data={this.props.userData}/>
            <Calendar onChangeDate={this.updateDate} onChangeMonth={this.updateListExistingDates}
                      listExistingDates={this.props.listExistingDates} date={this.props.date}/>
            {this.props.date &&
            <AppointmentsList id={this.props.userData.id} date={this.props.date} store={this.props.store}
                              onBookTime={this.updateListExistingDates}/>}
        </div> : <Preloader/>;
    }
}



const mapStateToProps = (state) => {
    return {
        date: state.contractorCalendarReducer.date,
        userData: state.contractorCalendarReducer.userData,
        listExistingDates: state.contractorCalendarReducer.listExistingDates,
        selectedDate: state.contractorCalendarReducer.selectedDate,
        isCalendarLoading: state.contractorCalendarReducer.isCalendarLoading,
    };
};

export default connect(mapStateToProps)(withRouter(ContractorCalendar));
