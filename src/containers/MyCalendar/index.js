import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Calendar} from '../../components/Calendar';
import {Appointment} from '../../components/Appointment';
import {ScheduleForm} from '../../components/ScheduleForm';
import {ScheduleList} from '../../components/ScheduleList';


class MyCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.setDates = this.setDates.bind(this);
    }

    state = {
        currentDate: null,
        date: null,
        timeList: null,
    };

    setDates(date, currentDate) {
        this.setState({
            currentDate: currentDate,
            date: date,
        });
    }

    render() {
        return (
            <React.Fragment>
                <Calendar onChangeDate={this.setDates}/>
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
                        <ScheduleList date={this.state.date}/>
                        {this.state.currentDate ? <ScheduleForm currentDate={this.state.currentDate}/> : false}
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        );
    }
}


export {MyCalendar};
