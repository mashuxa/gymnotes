import React from 'react';
import './style.scss';
import defaultAvatar from './assets/guest.png';
import {Link} from "react-router-dom";

const Avatar = (props) =>{
    console.log();
    const avatarSrc = props.src ? props.src : defaultAvatar;
        return (
        <Link to='/settings' className='avatar'>
            <img className='avatar__image' width='44' src={avatarSrc} alt='Guest' title=' click for preview you
                 photo'/>
        </Link>
    );
};
export { Avatar };
