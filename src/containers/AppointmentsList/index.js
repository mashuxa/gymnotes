import './style.scss';
import React from 'react';
import {Button} from "../../components/Button";
import {API_URL} from "../../constants";
import {Preloader} from "../../components/Preloader";
import {connect} from "react-redux";
import * as actions from "../../actions";

class AppointmentsList extends React.Component {
    constructor(props) {
        super(props);

        this.unSelectTime = this.unSelectTime.bind(this);
        this.bookTime = this.bookTime.bind(this);
    }

    componentDidMount() {
        this.getTimeList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.date !== prevProps.date) {
            this.getTimeList();
        }
    }

    getTimeList() {
        const url = `${API_URL}/user-get-list`;

        this.props.store.dispatch(actions.setAppointmentListData({
            timeList: null,
        }));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: this.props.id,
                date: this.props.date,
            }),
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            this.props.store.dispatch(actions.setAppointmentListData({
                isUpdating: false,
                timeList: result.data,
                isLoading: false,
            }));
        });
    }

    setSelectedTimeIndex(i) {
        this.props.store.dispatch(actions.setAppointmentListData({
            selectedTimeIndex: i
        }));
    }

    unSelectTime(e) {
        if (!e.target.classList.contains('appointments-list__item') && !e.target.classList.contains('btn')) {
            this.props.store.dispatch(actions.setAppointmentListData({selectedTimeIndex: null}));
            document.removeEventListener('click', this.unSelectTime);
        }
    }

    bookTime() {
        const url = `${API_URL}/user-book-time`;

        this.props.store.dispatch(actions.setAppointmentListData({
            isLoading: true,
        }));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: this.props.id,
                date: this.props.date,
                time: this.props.timeList[this.props.selectedTimeIndex],
            }),
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            if (result.success) {
                const timeList = [...this.props.timeList];

                timeList.splice(this.props.selectedTimeIndex, 1);

                this.props.onBookTime();

                this.props.store.dispatch(actions.setAppointmentListData({
                    isLoading: false,
                    selectedTimeIndex: null,
                    timeList,
                }));
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <section className="appointments-list">
                    <div className="appointments-list__wrapper">
                        {this.props.timeList ? this.props.timeList.map((date, i) => {
                            const isSelected = this.props.selectedTimeIndex === i;
                            const itemClass = 'appointments-list__item';

                            return <div
                                className={`${itemClass} ${isSelected ? `${itemClass}--active` : ''}`} key={i}
                                onClick={() => {
                                    this.setSelectedTimeIndex(i);
                                    document.addEventListener('click', this.unSelectTime);
                                }}>
                                {date}
                            </div>;
                        }): <Preloader/>}
                    </div>
                    <div className="appointments-list__btns-wrapper">
                        {this.props.selectedTimeIndex !== null && <Button type='success' text={'Book'}
                                                                          action={this.bookTime}/>}
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedTimeIndex: state.appointmentListReducer.selectedTimeIndex,
        timeList: state.appointmentListReducer.timeList,
        isLoading: state.appointmentListReducer.isLoading,
    };
};

export default connect(mapStateToProps)(AppointmentsList);
