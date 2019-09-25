import React from 'react';
import {Preloader} from '../../components/Preloader';
import {ContractorCard} from '../../components/ContractorCard';
import {Calendar} from '../../components/Calendar';
import {ScheduleList} from '../../components/ScheduleList';
import {API_URL} from "../../constants";

class UserCalendar extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoading: true,
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
                    isLoading: false
                });
                console.log(result.data);
            } else {
                console.log(result);
            }
        });
    }

    render() {
        return this.state.isLoading ? <Preloader/> : <h1>User Data</h1>;
    }
}

export {UserCalendar};
