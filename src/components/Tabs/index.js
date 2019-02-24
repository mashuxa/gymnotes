import './style.scss';
import React from 'react';
import {Appointment} from '../Appointment';
import {FormSchedule} from '../FormSchedule';
import {TimeList} from '../TimeList';

function Tabs() {
    return (
        <section className="tabs">
            <input className="tabs__radio-input" type="radio" id="tab-1" name="tabs-1"/>
            <input className="tabs__radio-input" type="radio" id="tab-2" name="tabs-1"/>
            <input className="tabs__radio-input" type="radio" id="tab-3" name="tabs-1" defaultChecked/>
            <div className="tabs__label-wrapper">
                <label className="tabs__label" htmlFor="tab-1">My appointments</label>
                <label className="tabs__label" htmlFor="tab-2">My clients</label>
                <label className="tabs__label" htmlFor="tab-3">My schedule</label>
            </div>
            <div className="tabs__tab tabs__tab--1">
                <Appointment/>
            </div>
            <div className="tabs__tab tabs__tab--2">
                <Appointment/>
                <Appointment/>
                <Appointment/>
            </div>
            <div className="tabs__tab tabs__tab--3">
                <TimeList/>
                <FormSchedule/>
            </div>
        </section>
    );
}

export {Tabs};