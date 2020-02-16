import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

export default function() {
    return (
        <header className="header">
            <Link exact="true" to='/' className="logo">
                GymNotes
            </Link>
        </header>
    );
}
