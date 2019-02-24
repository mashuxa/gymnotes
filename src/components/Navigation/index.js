import './style.scss';
import React from 'react';
import {NavLink} from 'react-router-dom';


import { ReactComponent as IconMenu }      from './assets/menu.svg';
import { ReactComponent as IconHome }      from './assets/home.svg';
import { ReactComponent as IconCalendar }  from './assets/calendar.svg';
import { ReactComponent as IconSettings }  from './assets/settings.svg';

function Navigation() {
    return (
        <React.Fragment>
            <input className="navigation__toggle" id="navigationMain" type="checkbox"/>
            <nav className="navigation">
                <label className="navigation__link navigation__link--menu" htmlFor="navigationMain">
                    <IconMenu className="navigation__link-icon"/>
                    <span className="navigation__link-name">Menu</span>
                </label>

                    <NavLink exact to='/' className="navigation__link">
                        <IconHome className="navigation__link-icon"/>
                        <span className="navigation__link-name">Home</span>
                    </NavLink>
                    <NavLink to='/my-calendar' className="navigation__link">
                        <IconCalendar className="navigation__link-icon"/>
                        <span className="navigation__link-name">Calendar</span>
                    </NavLink>
                    <NavLink to='/settings' className="navigation__link">
                        <IconSettings className="navigation__link-icon"/>
                        <span className="navigation__link-name">Settings</span>
                    </NavLink>
            </nav>
        </React.Fragment>);
}

export {Navigation};
