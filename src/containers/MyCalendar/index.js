import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Calendar} from '../../components/Calendar';
import {Appointment} from '../../components/__unused/Appointment';
import {ScheduleList} from '../../components/ScheduleList';
import {API_URL} from "../../constants";

class MyCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.updateDate = this.updateDate.bind(this);
        this.updateListExistingDates = this.updateListExistingDates.bind(this);
        this.getAppontments = this.getAppontments.bind(this);
        this.getClients = this.getClients.bind(this);
    }

    state = {
        currentDate: '',
        date: '',
        listExistingDates: '',
        isCalendarLoading: false,
        appointments: [],
        clients: [],
    };

    updateDate(date, currentDate) {
        this.setState({
            date, currentDate
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
        console.log('getAppontments');
    }

    getClients() {
        console.log('getClients');
    }

    render() {
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
                        {this.state.appointments.map((el)=>{
                            <Appointment src={el.src} name={el.name} time={el.time} date={el.date} phone={el.phone}
                                         onCancel={this.getAppontments}/>
                        })}
                    </TabPanel>
                    <TabPanel>
                        {this.state.clients.map((el)=>{
                            <Appointment src={el.src} name={el.name} time={el.time} date={el.date} phone={el.phone}
                                         onCancel={this.getAppontments}/>
                        })}
                    </TabPanel>
                    <TabPanel>
                        {this.state.date && <ScheduleList date={this.state.date} currentDate={this.state.currentDate}
                                                          listExistingDates={this.state.listExistingDates}
                                                          updateListExistingDates={() => {
                                                              this.updateListExistingDates(this.state.date);
                                                          }}
                        />}
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        );
    }
}


export {MyCalendar};
