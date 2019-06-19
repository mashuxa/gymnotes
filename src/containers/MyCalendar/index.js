import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Calendar} from '../../components/Calendar';
import {Appointment} from '../../components/Appointment';
import {ScheduleForm} from '../../components/ScheduleForm';
import {ScheduleList} from '../../components/ScheduleList';


class MyCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.setDate = this.setDate.bind(this);
    }

    setDate(date){
        this.setState({
            date: date
        });
    }

    render() {
        return (
            <React.Fragment>
                <Calendar onChangeDate={this.setDate}/>
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
                        <ScheduleList/>
                        <ScheduleForm/>
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        );
    }
}


export {MyCalendar};
