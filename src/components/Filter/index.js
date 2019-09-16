import './style.scss';
import './app';
import React from 'react';

function FilterDate() {
    return (
        <section className="filter-date">
            <label className="filter-date__label">
                <span className="filter-date__label-name">Select time from</span>
                <input className="filter-date__input form__input--date" type="datetime-local" id="startDate"/>
            </label>

            <label className="filter-date__label">
                <span className="filter-date__label-name">till</span>
                <input className="filter-date__input form__input--date" type="datetime-local" id="endDate"/>
            </label>

            <button className="btn" type="button">
                Search!
                {/*<svg className='btn__icon'>*/}
                    {/*<use xlink:href="#arrow-right"></use>*/}
                {/*</svg>*/}
            </button>
        </section>
);
}

export {FilterDate};