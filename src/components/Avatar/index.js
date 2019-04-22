import React from 'react';
import './style.scss';
import defaultAvatar from './assets/guest.png';

const Avatar = (props) => {
    const avatarSrc = props.src ? props.src : defaultAvatar;
    const isFileInput = props.isFileInput;
    return (
        isFileInput ?
            <label className='avatar avatar--label'>
                <input className='avatar--label__input' type="file"/>
                <img className='avatar__image' width='44' src={avatarSrc} alt='Guest' title=' click for preview you
                 photo'/>
            </label>
            :
            <div className='avatar'>
                <img className='avatar__image' width='44' src={avatarSrc} alt='Guest' title=' click for preview you
                 photo'/>
            </div>
    );
};
export {Avatar};
