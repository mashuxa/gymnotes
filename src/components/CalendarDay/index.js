import './style.scss';
import React from 'react';

class CalendarDay extends React.Component {
    state = {
        isAvailable: false,
        date: '',
        appointments: [],
    };

    getClasses(){
        const mainClassName = 'day';
        const availableClass = this.state.isCurrent ? `${mainClassName}--available` : false;
        const selectedClass = this.props.isSelected ? `${mainClassName}--selected` : false;

        return `${mainClassName} ${availableClass} ${selectedClass}`;
    }

    render() {
        return (
            <td className={this.getClasses()} data-date={this.props.date} onClick={this.props.onClickDay}>
                {this.props.date}
            </td>
        );
    }
}

export {CalendarDay};