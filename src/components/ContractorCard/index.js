import './style.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from '../Avatar';
import {ReactComponent as IconPhone} from './assets/phone.svg';

function ContractorCard() {
    return (
        <article className="contractor-card">
            <div className="contractor-card__avatar-wrapper">
                <Avatar/>
            </div>
            <h1 className="contractor-card__name">
                Name Lastname
            </h1>
            <a className="contractor-card__phone" href="tel:+375291234567">
                <IconPhone className='contractor-card__link-icon'/>
                +375291234567
            </a>
            <div className="contractor-card__category-tags-wrapper">
                <span className="contractor-card__category">Category</span>
                <span className="contractor-card__category">Category</span>
                <span className="contractor-card__category">Category</span>
                <span className="contractor-card__category">Category</span>
            </div>
            <div className="contractor-card__description">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </div>
            <Link className="btn"
                  to="/contractor-calendar">
                Show calendar
            </Link>
        </article>
    );
}


export {ContractorCard};