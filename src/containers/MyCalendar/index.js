import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {Calendar} from '../../components/Calendar';
import {Appointment} from '../../components/Appointment';
import {FormSchedule} from '../../components/FormSchedule';
import {DaySchedule} from '../../components/DaySchedule';


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
                <Tabs>
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
                        <DaySchedule/>
                        <FormSchedule/>
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        );
    }
}


export {MyCalendar};
