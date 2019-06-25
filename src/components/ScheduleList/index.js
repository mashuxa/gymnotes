import './style.scss';
import React from 'react';
import {Button} from "../Button";
import {Preloader} from "../Preloader";
import {API_URL} from "../../constants";

class ScheduleList extends React.Component {
    constructor(props) {
        super(props);

        this.updateTimeList = this.updateTimeList.bind(this);
    }

    state = {
        timeList: '',
        date: '',
    };

    componentDidUpdate(prevProps) {
        const nextProps = this.props.date;
        if (prevProps.date !== nextProps) {
            this.setState({date: nextProps});
            this.updateTimeList(nextProps);
        }
    }

    showError(e) {
        console.error('Error', e);
    }

    updateTimeList(date) {
        const url = `${API_URL}/calendar/get-list`;

        this.setState({
            timeList: '',
        });

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({date: date}),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.setState({timeList: result.data});
            } else {
                this.showError(result);
            }
        });
    }

    render() {
        // this.state.timeList.timeList.map((el, i) => {
        //     return <span key={i}>{el.time}</span>;
        // });
        const timeList = this.state.timeList ? (
            this.state.timeList.length ?
                this.state.timeList.map((el, i) => {
                    return <div key={i}>{el.time}</div>;
                }) : <div className="schedule__msg">No items</div>) : <Preloader/>;

        return (
            <React.Fragment>
                <section className="schedule">
                    <h2 className="schedule__header">{this.state.date}</h2>
                    {/*<h2 className="schedule__header">Choose time</h2>*/}
                    {/**/}
                    {timeList}
                    <div className="schedule__btns-wrapper">
                        <Button type='danger' text={'Cancel time'} action={(e) => {
                            console.log('Cancel time');
                        }}/>
                        <Button type='success' text={'Add new'} action={(e) => {
                            console.log('Add new');
                        }}/>
                    </div>
                </section>
            </React.Fragment>
        );
    }


}

export {ScheduleList};
