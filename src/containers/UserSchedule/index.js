import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Calendar} from '../../components/Calendar';
import {Preloader} from '../../components/Preloader';
import {Appointment} from '../../components/Appointment';
import ScheduleList from '../ScheduleList';
import {API_URL} from "../../constants";
import {connect} from "react-redux";
import * as actions from "../../actions";

class UserSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.updateDate = this.updateDate.bind(this);
        this.updateListExistingDates = this.updateListExistingDates.bind(this);
        this.getAppontments = this.getAppontments.bind(this);
        this.getClients = this.getClients.bind(this);
        this.cancelClient = this.cancelClient.bind(this);
        this.cancelAppointment = this.cancelAppointment.bind(this);
    }

    componentDidMount() {
        this.updateListExistingDates(this.props.date);
    }

    componentDidUpdate(prevProps) {
        const nextProps = this.props.date;
        if (prevProps.date !== nextProps) {
            this.getAppontments(this.props.date);
            this.getClients(this.props.date);
        }
    }

    getAppontments(date) {
        const url = `${API_URL}/user-get-appointments`;
        this.props.store.dispatch(actions.setUserScheduleData({
            appointments: null,
        }));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({date}),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.props.store.dispatch(actions.setUserScheduleData({
                    appointments: result.data
                }));
            } else {
                console.error(result.message);
            }
        });
    }

    getClients(date) {
        const url = `${API_URL}/user-get-clients`;

        this.props.store.dispatch(actions.setUserScheduleData({
            clients: null,
        }));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({date}),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.props.store.dispatch(actions.setUserScheduleData({
                    clients: result.data
                }));
            } else {
                console.error(result.message);
            }
        });
    }

    updateDate(date) {
        this.props.store.dispatch(actions.setUserScheduleData({date}));
        this.getClients(date);
        this.getAppontments(date);
    }

    updateListExistingDates(date) {
        const url = `${API_URL}/calendar/get-month-dates`;

        this.props.store.dispatch(actions.setUserScheduleData({
            date,
            listExistingDates: [],
            isCalendarLoading: true,
        }));

        this.getClients(date);
        this.getAppontments(date);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({date}),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.props.store.dispatch(actions.setUserScheduleData({
                    listExistingDates: result.data,
                    isCalendarLoading: false,
                }));
            } else {
                console.error(`Access denied! ${result.message}`);
                this.props.history.push('/login');
            }
        });
    }

    cancelClient(appointmentData) {
        const url = `${API_URL}/user-cancel-client`;

        this.props.store.dispatch(actions.setUserScheduleData({clients: null}));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(appointmentData),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.getClients();
            } else {
                console.error(result.message);
            }
        });
    }

    cancelAppointment(appointmentData) {
        const url = `${API_URL}/user-cancel-appointment`;

        this.props.store.dispatch(actions.setUserScheduleData({appointments: null}));

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(appointmentData),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.getAppontments();
            } else {
                console.error(result.message);
            }
        });
    }

    render() {
        const appointments = this.props.appointments;
        const clients = this.props.clients;

        return (
            <React.Fragment>
                <Calendar onChangeDate={this.updateDate} onChangeMonth={(date) => {
                    this.updateListExistingDates(date);
                }}
                          listExistingDates={this.props.listExistingDates} isLoading={this.props.isCalendarLoading}
                          date={this.props.date}
                />
                <Tabs defaultIndex={3}>
                    <TabList>
                        <Tab>My Appointments</Tab>
                        <Tab>My Clients</Tab>
                        <Tab>Free time</Tab>
                    </TabList>
                    <TabPanel>
                        {!appointments ? <Preloader/> : appointments.map((el, i) => {
                            return <Appointment src={el.avatarSrc} key={i} name={el.name} time={el.time} date={el.date}
                                                phone={el.phone} id={el.id} onCancel={() => {
                                this.cancelAppointment(el)
                            }}/>
                        })}
                    </TabPanel>
                    <TabPanel>
                        {!clients ? <Preloader/> : clients.map((el, i) => {
                            return <Appointment src={el.avatarSrc} name={el.name} time={el.time} date={el.date}
                                                phone={el.phone} id={el.id} key={i} onCancel={() => {
                                this.cancelClient(el)
                            }}/>
                        })}
                    </TabPanel>
                    <TabPanel>
                        {this.props.date && <ScheduleList date={this.props.date} store={this.props.store}
                                                          listExistingDates={this.props.listExistingDates}
                                                          updateListExistingDates={() => {
                                                              this.updateListExistingDates(this.props.date);
                                                          }}/>}
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        date: state.userScheduleReducer.date,
        listExistingDates: state.userScheduleReducer.listExistingDates,
        isCalendarLoading: state.userScheduleReducer.isCalendarLoading,
        appointments: state.userScheduleReducer.appointments,
        clients: state.userScheduleReducer.clients,
    };
};

export default connect(mapStateToProps)(UserSchedule);
