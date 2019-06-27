import './style.scss';
import React from 'react';
import {Button} from "../Button";
import {Preloader} from "../Preloader";
import {API_URL} from "../../constants";
import {ScheduleForm} from "../ScheduleForm";

class ScheduleList extends React.Component {
    constructor(props) {
        super(props);

        this.getTimeList = this.getTimeList.bind(this);
        this.toggleScheduleForm = this.toggleScheduleForm.bind(this);
        this.deleteTime = this.deleteTime.bind(this);
        this.unSelectTime = this.unSelectTime.bind(this);
    }

    state = {
        isLoading: true,
        isShownScheduleForm: false,
        timeList: '',
        selectedTimeIndex: null,
    };

    componentDidMount() {
        this.getTimeList();
    }

    componentDidUpdate(prevProps) {
        const nextPropsDate = this.props.date;
        if (prevProps.date !== nextPropsDate) {
            this.getTimeList();
        }
    }

    showError(e) {
        console.error('Error', e);
    }

    getTimeList() {
        const url = `${API_URL}/calendar/get-list`;

        this.setState({
            isLoading: true,
        });

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({date: this.props.date}),
        }).then(result => {
            return result.ok ? result.json() : this.showError;
        }).then(result => {
            if (result.success) {
                this.setState({
                    isLoading: false,
                    selectedTimeIndex: null,
                    timeList: result.data
                });
            } else {
                this.showError(result);
            }
        });
    }

    deleteTime(){
        const date = this.props.date;
        const timeIndex = this.state.selectedTimeIndex;
        const msg = `Do you want to delete appointment ${this.state.timeList[timeIndex].time}/${date}?`;
        const url = `${API_URL}/calendar/delete-time`;

        {/* eslint-disable-next-line */}
        if(confirm(msg)){
            this.setState({
                isLoading: true,
            });

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    date: date,
                    timeIndex: timeIndex,
                }),
            }).then(result => {
                return result.ok ? result.json() : this.showError;
            }).then(result => {
                if (result.success) {
                    this.setState({
                        isLoading: false,
                        timeList: result.data,
                        selectedTimeIndex: null,
                    });
                } else {
                    this.showError(result);
                }
            });
        }
    }

    toggleScheduleForm() {
        this.setState({
            isShownScheduleForm: !this.state.isShownScheduleForm
        });
    }

    unSelectTime(e){
        if(!e.target.classList.contains('schedule__item')){
            this.setState({selectedTimeIndex: null});
            document.removeEventListener('click', this.unSelectTime);
        }
    }

    render() {
        const timeList = !this.state.timeList.length ?
            <div className="schedule__msg">No items</div> : <div className="schedule__item-wrapper">{
                this.state.timeList.map((el, i) => {
                    const isSelectedTime = this.state.selectedTimeIndex === i;
                    const itemClassBase = 'schedule__item';
                    const itemClassSelected = isSelectedTime ? ` ${itemClassBase}--selected` : '';
                    const itemClassBooked = el.bookedBy ? ` ${itemClassBase}--booked` : '';

                    return <div className={`${itemClassBase}${itemClassSelected}${itemClassBooked}`} key={i}
                                onClick={() => {
                                    this.setState({selectedTimeIndex: i});
                                    document.addEventListener('click', this.unSelectTime);
                                }}
                    >{el.time}</div>;
                })
            }</div>;

        return (
            <React.Fragment>
                <section className="schedule">
                    <h2 className="schedule__header">{this.state.date}</h2>
                    {this.state.isLoading ? <Preloader/> : timeList}

                    <div className="schedule__btns-wrapper">
                        {!(this.state.selectedTimeIndex === null) ? <Button type='danger' text={'Cancel time'} action={this.deleteTime}/> : false}
                        <Button type='success' text={this.state.isShownScheduleForm ? 'Hide form' : 'Add more dates'}
                                action={this.toggleScheduleForm}/>
                    </div>
                </section>
                {this.state.isShownScheduleForm && <ScheduleForm currentDate={this.props.currentDate} onUpdateTimeList={this.getTimeList}/>}
            </React.Fragment>
        );
    }


}

export {ScheduleList};
