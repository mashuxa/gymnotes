import './style.scss';
import React from 'react';

class Day extends React.Component {
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
            <td className={this.getClasses()}>
                {this.props.date}
            </td>
        );
    }
}

export {Day};
