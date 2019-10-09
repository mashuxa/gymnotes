import './style.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from '../Avatar';
import {ReactComponent as IconPhone} from './assets/phone.svg';

function ContractorCard(props) {
    return (
        <article className="contractor-card">
            <div className="contractor-card__avatar-wrapper">
                <Avatar isFileInput={false} name={`${props.data.name}`}/>
            </div>
            <h1 className="contractor-card__name">
                {props.data.name}
            </h1>
            <a className="contractor-card__phone" href="tel:+375291234567">
                {props.data.phone && <IconPhone className='contractor-card__link-icon'/>}
                {props.data.phone}
            </a>
            <div className="contractor-card__description">
                {props.data.description}
            </div>
            {props.isHiddenLink ? false : <Link className="btn contractor-card__link" to={`/user/${props.data.id}`}>
                Show calendar
            </Link>}
        </article>
    );
}


export {ContractorCard};
