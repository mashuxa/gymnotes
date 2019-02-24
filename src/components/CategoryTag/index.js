import './style.scss';
import React from 'react';
import {ReactComponent as IconClose} from './assets/close.svg';

function CategoryTag() {
    return (
        <div className="category-tag">
            Category item
            <IconClose className='category-tag__icon category-tag__icon--cancel'/>
        </div>
    );
}

export {CategoryTag};
