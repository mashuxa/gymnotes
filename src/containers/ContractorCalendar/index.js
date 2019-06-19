import React from 'react';
import {ContractorCard} from '../../components/ContractorCard';
import {Calendar} from '../../components/Calendar';
import {ScheduleList} from '../../components/ScheduleList';


function ContractorCalendar() {
    return (
        <React.Fragment>
            <ContractorCard/>
            <Calendar/>
            <ScheduleList/>
        </React.Fragment>
    );
}


export {ContractorCalendar};
