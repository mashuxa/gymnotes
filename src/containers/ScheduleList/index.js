import './style.scss';
import React from 'react';
import {Button} from "../../components/Button";
import {Preloader} from "../../components/Preloader";
import {API_URL} from "../../constants";
import ScheduleForm from "../ScheduleForm";
import {connect} from "react-redux";
import * as actions from "../../actions";

class ScheduleList extends React.Component {
    constructor(props) {
        super(props);

        this.getTimeList = this.getTimeList.bind(this);
        this.toggleScheduleForm = this.toggleScheduleForm.bind(this);
        this.deleteTime = this.deleteTime.bind(this);
        this.unSelectTime = this.unSelectTime.bind(this);
    }

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

        this.props.store.dispatch(actions.setScheduleListData({
            isLoading: true,
        }));

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
                this.props.store.dispatch(actions.setScheduleListData({
                    isLoading: false,
                    selectedTimeIndex: null,
                    timeList: result.data
                }));
            } else {
                this.showError(result);
            }
        });
    }

    deleteTime() {
        const date = this.props.date;
        const timeIndex = this.props.selectedTimeIndex;
        const msg = `Do you want to delete appointment ${this.props.timeList[timeIndex].time}/${date}?`;
        const url = `${API_URL}/calendar/delete-time`;

        /* eslint-disable-next-line */
        if (confirm(msg)) {
            this.props.store.dispatch(actions.setScheduleListData({
                isLoading: true,
            }));

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
                    this.props.store.dispatch(actions.setScheduleListData({
                        isLoading: false,
                        timeList: result.data,
                        selectedTimeIndex: null,
                    }));
                } else {
                    this.showError(result);
                }
            });
        }
    }

    toggleScheduleForm() {
        this.props.store.dispatch(actions.setScheduleListData({
            isShownScheduleForm: !this.props.isShownScheduleForm
        }));
    }

    unSelectTime(e) {
        if (!e.target.classList.contains('schedule__item')) {
            this.props.store.dispatch(actions.setScheduleListData({selectedTimeIndex: null}));
            document.removeEventListener('click', this.unSelectTime);
        }
    }

    render() {
        const timeList = !this.props.timeList.length ?
            <div className="schedule__msg">No items</div> : <div className="schedule__item-wrapper">{
                this.props.timeList.map((el, i) => {
                    const isSelectedTime = this.props.selectedTimeIndex === i;
                    const itemClassBase = 'schedule__item';
                    const itemClassSelected = isSelectedTime ? ` ${itemClassBase}--selected` : '';
                    const itemClassBooked = el.bookedBy ? ` ${itemClassBase}--booked` : '';

                    return <div className={`${itemClassBase}${itemClassSelected}${itemClassBooked}`} key={i}
                                onClick={() => {
                                    this.props.store.dispatch(actions.setScheduleListData({selectedTimeIndex: i}));
                                    document.addEventListener('click', this.unSelectTime);
                                }}
                    >{el.time}</div>;
                })
            }</div>;

        return (
            <React.Fragment>
                <section className="schedule">
                    <h2 className="schedule__header">{this.props.date}</h2>
                    {this.props.isLoading ? <Preloader/> : timeList}

                    <div className="schedule__btns-wrapper">
                        {!(this.props.selectedTimeIndex === null) ?
                            <Button type='danger' text={'Cancel time'} action={this.deleteTime}/> : false}
                        <Button type='success' text={this.props.isShownScheduleForm ? 'Hide form' : 'Add more dates'}
                                action={this.toggleScheduleForm}/>
                    </div>
                </section>
                {this.props.isShownScheduleForm && <ScheduleForm store={this.props.store}
                                                                 currentDate={this.props.currentDate}
                                                                 onUpdateTimeList={() => {
                                                                     this.getTimeList();
                                                                     this.props.updateListExistingDates();
                                                                 }}/>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.scheduleListReducer.isLoading,
        isShownScheduleForm: state.scheduleListReducer.isShownScheduleForm,
        timeList: state.scheduleListReducer.timeList,
        selectedTimeIndex: state.scheduleListReducer.selectedTimeIndex,
    };
};

export default connect(mapStateToProps)(ScheduleList);
