import './style.scss';
import React from 'react';
import {ReactComponent as IconChecked} from './assets/checked.svg';
import {ReactComponent as IconClose} from './assets/close.svg';
import {ReactComponent as IconPlus} from './assets/plus.svg';

function FormSchedule() {
    return (
        <section className="form-schedule">
            <h2 className="form-schedule__header">
                Pick the time of appointment
            </h2>
            <div className="form-schedule__presets form-schedule__presets--time">
                <input className="form-schedule__input-time" type="time"/>
                <input className="form-schedule__input-time" type="time"/>
                <input className="form-schedule__input-time" type="time"/>
                <button className="btn btn--success">
                    Add one more
                    <IconPlus className='form-schedule__btn-icon form-schedule__btn-icon--plus'/>
                </button>
            </div>
            <div className="form-schedule__presets form-schedule__presets--time">
        <span>From
            <input className="form-schedule__input-date" type="date"/>
        </span>
                <span>till
            <input className="form-schedule__input-date" type="date"/>
        </span>
            </div>
            <div className="form-schedule__presets form-schedule__presets--days">
                <label className="form-schedule__day-label">
                    <input className="form-schedule__day-input" type="checkbox" defaultChecked id="mon"/>
                    <span className="form-schedule__day-name">mon</span>
                    <span className="form-schedule__day-checkbox">
                        <IconChecked className='form-schedule__chekbox-icon'/>
            </span>
                </label>
                <label className="form-schedule__day-label">
                    <input className="form-schedule__day-input" type="checkbox" defaultChecked id="tue"/>
                    <span className="form-schedule__day-name">tue</span>
                    <span className="form-schedule__day-checkbox">
                <IconChecked className='form-schedule__chekbox-icon'/>
            </span>
                </label>
                <label className="form-schedule__day-label">
                    <input className="form-schedule__day-input" type="checkbox" defaultChecked id="wed"/>
                    <span className="form-schedule__day-name">wed</span>
                    <span className="form-schedule__day-checkbox">
                <IconChecked className='form-schedule__chekbox-icon'/>
            </span>
                </label>
                <label className="form-schedule__day-label">
                    <input className="form-schedule__day-input" type="checkbox" defaultChecked id="thu"/>
                    <span className="form-schedule__day-name">thu</span>
                    <span className="form-schedule__day-checkbox">
               <IconChecked className='form-schedule__chekbox-icon'/>
            </span>
                </label>
                <label className="form-schedule__day-label">
                    <input className="form-schedule__day-input" type="checkbox" defaultChecked id="fri"/>
                    <span className="form-schedule__day-name">fri</span>
                    <span className="form-schedule__day-checkbox">
                <IconChecked className='form-schedule__chekbox-icon'/>
            </span>
                </label>
                <label className="form-schedule__day-label">
                    <input className="form-schedule__day-input" type="checkbox" id="sat"/>
                    <span className="form-schedule__day-name">sat</span>
                    <span className="form-schedule__day-checkbox">
                <IconChecked className='form-schedule__chekbox-icon'/>
            </span>
                </label>
                <label className="form-schedule__day-label">
                    <input className="form-schedule__day-input" type="checkbox" id="sun"/>
                    <span className="form-schedule__day-name">sun</span>
                    <span className="form-schedule__day-checkbox">
              <IconChecked className='form-schedule__chekbox-icon'/>
            </span>
                </label>
            </div>
            <div className="form-schedule__btns-wrapper">
                <button className="btn btn--danger">
                    Cancel
                    <IconClose className='form-schedule__btn-icon form-schedule__btn-icon--cancel'/>
                </button>
                <button className="btn btn--success">
                    Add to calendar
                    <IconPlus className='form-schedule__btn-icon form-schedule__btn-icon--plus'/>
                </button>
            </div>
        </section>
    );
}

export {FormSchedule};