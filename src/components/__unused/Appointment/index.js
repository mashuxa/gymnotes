import './style.scss';
import React from 'react';
import {Avatar} from '../../Avatar';
import {ReactComponent as IconClose} from './assets/close.svg';
import {ReactComponent as IconPhone} from './assets/phone.svg';

function Appointment(props) {
    return (
        <table className="appointment">
            <tbody>
            <tr>
                <td className="appointment__avatar" rowSpan="2">
                    <Avatar src={props.src}/>
                </td>
                <td className="appointment__name">
                    {props.name}
                </td>
                <td className="appointment__time">{props.time}</td>
                <td className="appointment__phone">
                    <a href={`tel:${props.phone}`}>
                        <IconPhone className='appointment__icon appointment__icon--phone'/>
                    </a>
                </td>
            </tr>
            <tr>
                <td className="appointment__category"/>
                <td className="appointment__date">{props.date}</td>
                <td className="appointment__cancel" onClick={props.onCancel}>
                    <IconClose className='appointment__icon appointment__icon--cancel'/>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export {Appointment};
