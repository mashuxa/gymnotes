import React from 'react';
import './style.scss';
import defaultAvatar from './assets/guest.png';

const Avatar = (props) => {
    const avatarSrc = props.src ? props.src : defaultAvatar;
    const isFileInput = props.isFileInput;

    return (
        isFileInput ?
            <label className='avatar avatar--label' title='Change avatar'>
                <input className='avatar--label__input' type="file" onChange={props.onChangeAvatar}/>
                <img className='avatar__image' width='44' src={avatarSrc} alt={props.name}/>
            </label>
            :
            <div className='avatar'>
                <img className='avatar__image' width='44' src={avatarSrc} alt={props.name} title={props.name}/>
            </div>
    );
};
export {Avatar};
