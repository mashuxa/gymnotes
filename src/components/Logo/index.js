import React from 'react';
import logo from './assets/logo.png';

import './style.scss';

function Logo(){
    return(
        <a className="logo" href="#">
            <img className="logo__image" width="126" src={logo} alt="Pick Time" />
        </a>
    );
}

export {Logo};
