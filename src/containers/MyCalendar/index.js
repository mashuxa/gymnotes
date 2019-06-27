import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Calendar} from '../../components/Calendar';
import {Appointment} from '../../components/Appointment';
import {ScheduleList} from '../../components/ScheduleList';

class MyCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.updateDate = this.updateDate.bind(this);
    }

    state = {
        currentDate: '',
        date: '',
    };

    updateDate(date, currentDate) {
        this.setState({
            date, currentDate
        });
    }

    render() {
        return (
            <React.Fragment>
                <Calendar onChangeDate={this.updateDate}/>
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
                        {this.state.date && <ScheduleList date={this.state.date} currentDate={this.state.currentDate}/>}
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        );
    }
}


export {MyCalendar};
