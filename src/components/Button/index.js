import './style.scss';
import React from 'react';

function Button(props) {
    let className;

    switch (props.type) {
        case 'danger':
            className = 'btn btn--danger';
            break;
        case 'success':
            className = 'btn btn--success';
            break;
        default:
            className = 'btn btn--default';
    }

    return (
        <button type="button" onClick={props.action} className={className} title={props.title}>
            {props.text}
        </button>);
}

export {Button};
