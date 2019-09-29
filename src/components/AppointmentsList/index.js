import './style.scss';
import React from 'react';
import {Button} from "../Button";
import {API_URL} from "../../constants";
import {Preloader} from "../Preloader";

class AppointmentsList extends React.Component {
    constructor(props) {
        super(props);

        this.unSelectTime = this.unSelectTime.bind(this);
        this.bookTime = this.bookTime.bind(this);
    }

    state = {
        isLoading: true,
        timeList: [],
        selectedTimeIndex: null,
    };

    componentDidMount() {
        this.getTimeList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.date !== prevProps.date) {
            this.getTimeList();
        }
    }

    getTimeList() {
        const url = `${API_URL}/user-get-list`;

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
                id: this.props.id,
                date: this.props.date,
            }),
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            this.setState({
                isUpdating: false,
                timeList: result.data,
                isLoading: false,
            });
        });
    }

    setSelectedTimeIndex(i) {
        this.setState({
            selectedTimeIndex: i
        });
    }

    unSelectTime(e) {
        if (!e.target.classList.contains('appointments-list__item') && !e.target.classList.contains('btn')) {
            this.setState({selectedTimeIndex: null});
            document.removeEventListener('click', this.unSelectTime);
        }
    }

    bookTime() {
        const url = `${API_URL}/user-book-time`;

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
                id: this.props.id,
                date: this.props.date,
                time: this.state.timeList[this.state.selectedTimeIndex],
            }),
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            if (result.success) {
                const timeList = [...this.state.timeList];

                timeList.splice(this.state.selectedTimeIndex, 1);

                this.setState({
                    isLoading: false,
                    timeList,
                });
            }
        });
    }

    render() {
        console.log(this.state.timeList);
        return (
            <React.Fragment>
                {this.state.isLoading && <Preloader/>}
                <section className="appointments-list">
                    <div className="appointments-list__wrapper">
                        {this.state.timeList.map((date, i) => {
                            const isSelected = this.state.selectedTimeIndex === i;
                            const itemClass = 'appointments-list__item';

                            return <div
                                className={`${itemClass} ${isSelected ? `${itemClass}--active` : ''}`} key={i}
                                onClick={() => {
                                    this.setSelectedTimeIndex(i);
                                    document.addEventListener('click', this.unSelectTime);
                                }}>
                                {date}
                            </div>;
                        })}
                    </div>
                    <div className="appointments-list__btns-wrapper">
                        {this.state.selectedTimeIndex !== null && <Button type='success' text={'Book'}
                                                                          action={this.bookTime}/>}
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export {AppointmentsList};
