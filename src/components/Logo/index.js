import React from 'react';
import logo from './assets/logo.svg';

import './style.scss';

function Logo() {
    return logo ? <img className="logo__image" width="126" src={logo} title="QuickPick Home page"/> :
        <span>QuickPick</span>;
}

export {Logo};
