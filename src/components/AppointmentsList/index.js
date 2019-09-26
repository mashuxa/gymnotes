import './style.scss';
import React from 'react';
import {Button} from "../Button";
import {API_URL} from "../../constants";

class AppointmentsList extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoading: true,
        timeList: [],
        selectedTimeIndex: null,
    };

    componentDidMount() {
        this.getTimeList();
    }

    getTimeList() {
        const url = `${API_URL}/user/get-list`;

        const userData = JSON.stringify({
            userId: this.props.userId,
            date: this.props.date,
        });

        console.log(userData);

        this.setState({
            isLoading: true,
        });

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: userData,
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                console.log(result.data);
                // this.setState({
                //     isLoading: false,
                //     selectedTimeIndex: null,
                //     timeList: result.data
                // });
            } else {
                this.showError(result);
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <section className="appointments-list">
                    <div className="appointments-list__wrapper">
                        {this.state.timeList.map((date, i)=> <div className='appointments-list__item' key={i}>
                            {date}
                        </div>)}
                    </div>
                    <div className="schedule__btns-wrapper">
                        <Button type='danger' text={'Cancel'} />
                        <Button type='success' text={'Apply'} />
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export {AppointmentsList};
