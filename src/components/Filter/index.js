import './style.scss';
import React from 'react';


function Filter(props) {
    return (
        <form className="filter" onSubmit={props.onClickSearch}>
            <div className="d-flex">
                <label className="filter__label">
                    <span className="filter__label-name">
                        Time interval from:
                    </span>
                    <input className="filter__input form__input--date" type="datetime-local" id="startDate"
                           onChange={props.onSetStartDate} value={props.startDate} required
                    />
                </label>
                <label className="filter__label">
                    <span className="filter__label-name">till</span>
                    <input className="filter__input form__input--date" type="datetime-local" id="endDate"
                           onChange={props.onSetEndDate} value={props.endDate} required
                    />
                </label>
            </div>

            <div className="filter__text-filter">
                <input className="filter__input-search" type="search" placeholder="Text filter..."
                       onChange={props.onSetTextFilterValue} value={props.textFilterValue}/>
            </div>

            <button className="btn filter__btn" type="button" onClick={props.onClickSearch}>
                Search!
            </button>
        </form>
    );
}

export {Filter};
