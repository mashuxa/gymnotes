import './style.scss';
import React from 'react';
import {Button} from "../Button";
import {Preloader} from "../Preloader";

class ScheduleList extends React.Component {
    state = {
        isLoading: true,
        timeList: [],
    };

    componentDidMount() {
        // console.log('call AJAX here');
    }

    render() {
        return (
            <React.Fragment>
                <h1>{this.props.date}</h1>
                {this.state.isLoading ? <Preloader/> : (
                    <section className="schedule">
                        <h2 className="schedule__header">
                            Choose time
                        </h2>
                        <div className="schedule__item-wrapper">

                        </div>
                        <div className="schedule__msg">
                            No items
                        </div>
                        <div className="schedule__btns-wrapper">
                            <Button type='danger' text={'Cancel time'} action={(e) => {
                                console.log(e)
                            }}/>
                            <Button type='success' text={'Add new'} action={(e) => {
                                console.log(e)
                            }}/>
                        </div>
                    </section>)}
            </React.Fragment>
        );
    }
}

export {ScheduleList};
