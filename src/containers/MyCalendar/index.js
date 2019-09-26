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
    }

    state = {
        currentDate: '',
        date: '',
        listExistingDates: '',
        isCalendarLoading: false,
    };

    updateDate(date, currentDate) {
        this.setState({
            date, currentDate
        });
    }

    updateListExistingDates(date){
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
                console.error(result);
            }
        });
    }


    render() {
        return (
            <React.Fragment>
                <Calendar onChangeDate={this.updateDate} onChangeMonth={this.updateListExistingDates}
                          listExistingDates={this.state.listExistingDates} isLoading={this.state.isCalendarLoading}/>
                <Tabs defaultIndex={3}>
                    <TabList>
                        <Tab>My Appointments</Tab>
                        <Tab>My Clients</Tab>
                        <Tab>My Schedule</Tab>
                    </TabList>
                    <TabPanel>
                        <Appointment/>
                    </TabPanel>
                    <TabPanel>
                        <Appointment/>
                        <Appointment/>
                    </TabPanel>
                    <TabPanel>
                        {this.state.date && <ScheduleList date={this.state.date} currentDate={this.state.currentDate}
                                                          listExistingDates={this.state.listExistingDates}/>}
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        );
    }
}


export {MyCalendar};
