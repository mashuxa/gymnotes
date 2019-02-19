import React from 'react';
import logo from './assets/logo.png';

import './style.scss';

function Logo() {
    return (
        <img className="logo__image" width="126" src={logo} alt="Pick Time"/>
    );
}

export {Logo};
