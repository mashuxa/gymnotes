import './style.scss';
import React from 'react';
import {NavLink} from 'react-router-dom';

import {ReactComponent as IconMenu} from './assets/menu.svg';
import {ReactComponent as IconHistory} from './assets/history.svg';
import {ReactComponent as IconExercise} from './assets/exercise.svg';
import {ReactComponent as IconList} from './assets/list.svg';

export default function () {
  return (
    <React.Fragment>
      <input className="navigation__toggle" id="navigationMain" type="checkbox"/>
      <nav className="navigation">
        <label className="navigation__link navigation__link--menu" htmlFor="navigationMain">
          <IconMenu className="navigation__link-icon"/>
          <span className="navigation__link-name">Menu</span>
        </label>

        <NavLink exact to='/' className="navigation__link navigation__link--history">
          <IconHistory className="navigation__link-icon"/>
          <span className="navigation__link-name">History</span>
        </NavLink>
        <NavLink to='/current-activity' className="navigation__link">
          <IconExercise className="navigation__link-icon"/>
          <span className="navigation__link-name">Current Activity</span>
        </NavLink>
        <NavLink to='/exercise-list' className="navigation__link">
          <IconList className="navigation__link-icon"/>
          <span className="navigation__link-name">List of exercise</span>
        </NavLink>
      </nav>
    </React.Fragment>);
}
