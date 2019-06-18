import React from 'react';
import {ContractorCard} from '../../components/ContractorCard';
import {Calendar} from '../../components/Calendar';
import {DaySchedule} from '../../components/DaySchedule';


function ContractorCalendar() {
    return (
        <React.Fragment>
            <ContractorCard/>
            <Calendar/>
            <DaySchedule/>
        </React.Fragment>
    );
}


export {ContractorCalendar};
