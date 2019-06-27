import './style.scss';
import React from 'react';

export default (props) => {
    const classBase = 'day';
    const classExistTime = props.isExistTime ? ` ${classBase}--available` : '';
    const classSelected = props.isSelected ? ` ${classBase}--selected` : '';

    return (
        <td className={`${classBase}${classSelected}${classExistTime}`} data-date={props.date}
            onClick={props.onClickDay}>
            {props.date}
        </td>
    );
}
