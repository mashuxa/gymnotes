import './style.scss';
import { ReactComponent as IconLogin } from './assets/login.svg';

import React from 'react';
import {Link} from 'react-router-dom';
import {Logo} from '../Logo';
import {Avatar} from '../Avatar';

function Header() {
    const isUserLogged = false;
    return (
        <header className="header">
            <Link exact="true" to='/' className="logo">
                <Logo/>
            </Link>
            {isUserLogged ? <Avatar/> : <Link to='/enter' className='header__link header__link--login'><IconLogin className="header__icon header__icon--login"/></Link>}
        </header>
    );
}

export {Header};
