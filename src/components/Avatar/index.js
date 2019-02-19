import React from 'react';
import './style.scss';
import defaultAvatar from './assets/guest.png';

function Avatar() {
    return (
        <a className='avatar' href='#'>
            <img className='avatar__image' width='44' src={defaultAvatar} alt=' Guest' title=' click for preview you
                 photo'/>
        </a>
    );
}

export { Avatar };
