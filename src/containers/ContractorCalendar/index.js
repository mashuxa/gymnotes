import React from 'react';
import {ContractorCard} from '../../components/ContractorCard';
import {Calendar} from '../../components/Calendar';
import {TimeList} from '../../components/TimeList';


function ContractorCalendar() {
    return (
        <React.Fragment>
            <ContractorCard/>
            <Calendar/>
            <TimeList/>
        </React.Fragment>
    );
}


export {ContractorCalendar};
