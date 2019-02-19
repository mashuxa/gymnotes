import './style.scss';
import React from 'react';

function TimeList() {
    return (
        <section className="time-list">
            <h2 className="time-list__header">
                Choose time
            </h2>
            <div className="time-list__item-wrapper">
                <span className="time-list__item">9:00</span>
                <span className="time-list__item time-list__item--enable">10:30</span>
                <span className="time-list__item">12:00</span>
                <span className="time-list__item">13:30</span>
                <span className="time-list__item time-list__item--enable">15:00</span>
                <span className="time-list__item">16:30</span>
                <span className="time-list__item">17:30</span>
            </div>
            <div className="time-list__btns-wrapper">
                <button className="btn btn--danger">
                    Cancel time
                    'x'
                </button>
                <button className="btn btn--success">
                    Add new
                    '+'
                </button>
            </div>
        </section>
    );
}

export {TimeList};