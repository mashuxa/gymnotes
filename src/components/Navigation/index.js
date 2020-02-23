import './style.scss';
import React from 'react';
import {NavLink} from 'react-router-dom';

import {ReactComponent as IconMenu} from './assets/menu.svg';
import {ReactComponent as IconList} from './assets/list.svg';
import {ReactComponent as IconActivity} from './assets/activity.svg';
import {ReactComponent as IconPower} from './assets/power.svg';

export default function () {
  return (
    <React.Fragment>
      <input className="navigation__toggle" id="navigationMain" type="checkbox"/>
      <nav className="navigation">
        <label className="navigation__link navigation__link--menu" htmlFor="navigationMain">
          <IconMenu className="navigation__link-icon"/>
          <span className="navigation__link-name">Menu</span>
        </label>

        <NavLink exact to='/current-training' className="navigation__link">
          <IconPower className="navigation__link-icon"/>
          <span className="navigation__link-name">Current training</span>
        </NavLink>

        <NavLink exact to='/exercises-list' className="navigation__link">
          <IconList className="navigation__link-icon"/>
          <span className="navigation__link-name">List of exercises</span>
        </NavLink>

        <NavLink exact to='/exercises-history' className="navigation__link">
          <IconActivity className="navigation__link-icon"/>
          <span className="navigation__link-name">History of exercises</span>
        </NavLink>
      </nav>
    </React.Fragment>);
}
