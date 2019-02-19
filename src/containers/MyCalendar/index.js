import React from 'react';
import {Calendar} from '../../components/Calendar';
import {Tabs} from '../../components/Tabs';


function MyCalendar() {
    return (
        <React.Fragment>
            <Calendar/>
            <Tabs/>
        </React.Fragment>
    );
}


export {MyCalendar};
