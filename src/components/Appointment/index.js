import './style.scss';
import React from 'react';
import {Avatar} from '../Avatar';
import {CategoryTag} from '../CategoryTag';
import {ReactComponent as IconClose} from './assets/close.svg';
import {ReactComponent as IconPhone} from './assets/phone.svg';

function Appointment() {
    return (
        <table className="appointment">
            <tr>
                <td className="appointment__avatar" rowSpan="2">
                    <Avatar/>
                </td>
                <td className="appointment__name">
                    Jay Merriam Webster
                </td>
                <td className="appointment__time">19:00</td>
                <td className="appointment__phone">
                    <a href="tel:+375291234567">
                        <IconPhone className='appointment__icon appointment__icon--phone'/>
                    </a>
                </td>
            </tr>
            <tr>
                <td className="appointment__category">
                    <CategoryTag/>
                </td>
                <td className="appointment__date">10 junuary</td>

                <td className="appointment__cancel">
                    <IconClose className='appointment__icon appointment__icon--cancel'/>
                </td>
            </tr>
        </table>
    );
}

export {Appointment};