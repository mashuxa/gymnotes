import './style.scss';
import React from 'react';
import {ReactComponent as IconArrowRight} from './assets/arrow-right.svg';

function Btn() {
    return (
        <button className="btn" type="button">
            Search!
            <IconArrowRight className='btn__icon'/>
        </button>);
}

export {Btn};