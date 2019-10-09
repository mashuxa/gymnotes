import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Calendar} from '../../components/Calendar';
import {Preloader} from '../../components/Preloader';
import {Appointment} from '../../components/Appointment';
import {ScheduleList} from '../../components/ScheduleList';
import {API_URL} from "../../constants";

class MyCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.updateDate = this.updateDate.bind(this);
        this.updateListExistingDates = this.updateListExistingDates.bind(this);
        this.getAppontments = this.getAppontments.bind(this);
        this.getClients = this.getClients.bind(this);
        this.cancelClient = this.cancelClient.bind(this);
        this.cancelAppointment = this.cancelAppointment.bind(this);
    }

    state = {
        currentDate: '',
        date: '',
        listExistingDates: '',
        isCalendarLoading: false,
        appointments: null,
        clients: null,
    };

    updateDate(date, currentDate) {
        this.setState({
            date, currentDate
        }, () => {
            this.getClients();
            this.getAppontments();
        });
    }

    updateListExistingDates(date) {
        const url = `${API_URL}/calendar/get-month-dates`;

        this.setState({
            listExistingDates: [],
            isCalendarLoading: true,
        });

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

    getAppontments() {
        const url = `${API_URL}/user-get-appointments`;

        this.setState({
            appointments: null,
        });

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({date: this.state.date}),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.setState({
                    appointments: result.data
                });
            } else {
                console.error(result.message);
            }
        });
    }

    getClients() {
        const url = `${API_URL}/user-get-clients`;

        this.setState({
            clients: null,
        });
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({date: this.state.date}),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.setState({
                    clients: result.data
                });
            } else {
                console.error(result.message);
            }
        });
    }

    cancelClient(appointmentData) {
        const url = `${API_URL}/user-cancel-client`;

        this.setState({clients: null});

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

        this.setState({appointments: null});

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
        const appointments = this.state.appointments;
        const clients = this.state.clients;

        return (
            <React.Fragment>
                <Calendar onChangeDate={this.updateDate} onChangeMonth={this.updateListExistingDates}
                          listExistingDates={this.state.listExistingDates} isLoading={this.state.isCalendarLoading}/>
                <Tabs defaultIndex={3}>
                    <TabList>
                        <Tab onClick={this.getAppontments}>My Appointments</Tab>
                        <Tab onClick={this.getClients}>My Clients</Tab>
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
                        {this.state.date && <ScheduleList date={this.state.date} currentDate={this.state.currentDate}
                                                          listExistingDates={this.state.listExistingDates}
                                                          updateListExistingDates={() => {
                                                              this.updateListExistingDates(this.state.date);
                                                          }}/>}
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        );
    }
}


export {MyCalendar};
