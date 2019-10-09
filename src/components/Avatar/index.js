import React from 'react';
import './style.scss';
import defaultAvatar from './assets/guest.png';
import {API_URL} from '../../constants';

const Avatar = (props) => {
    const avatarSrc = props.src ? `${API_URL}${props.src}` : defaultAvatar;
    const isFileInput = props.isFileInput;

    return (
        isFileInput ?
            <label className='avatar avatar--label'>
                <input className='avatar--label__input' type="file" onChange={props.onChangeAvatar}/>
                <img className='avatar__image' width='44' src={avatarSrc} alt={props.name} title={props.name}/>
            </label>
            :
            <div className='avatar'>
                <img className='avatar__image' width='44' src={avatarSrc} alt={props.name} title={props.name}/>
            </div>
    );
};
export {Avatar};
