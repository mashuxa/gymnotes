import React from 'react';
import './style.scss';
import {Avatar} from '../Avatar';


class ContractorForm extends React.Component {
    render() {
        return (
            <form className="contractor-form" autoComplete="on">
                <div className="contractor-form__avatar-wrapper">
                    <Avatar className="avatar avatar--label"/>
                </div>
                <label className="contractor-form__label">
                    Your name:
                    <input className="contractor-form__input contractor-form__input--name" placeholder="My name is ..." type="text"/>
                </label>
                <label className="contractor-form__label">Your phone number:
                    <input className="contractor-form__input contractor-form__input--phone" placeholder="+375291234567" type="tel"/>
                </label>
                <div className="contractor-form__category-wrapper">
                    "category-tag--removable"
                </div>
                <div className="contractor-form__search-wrapper">
                    <input type="search" className="contractor-form__input contractor-form__input--category-search" id="contractorCategory"
                           placeholder="Start type category"/>
                    <div className="contractor-form__search-results">

                    </div>
                </div>
                <div className="contractor-form__search-wrapper">
                        <input className="contractor-form__input contractor-form__input--address-search" type="search"
                               id="contractorAddress" placeholder="Start type your address"/>
                        <div className="contractor-form__search-results">

                        </div>
                </div>
                <textarea className="contractor-form__description" rows="4" placeholder="Tell about you">

                </textarea>
                <div className="contractor-form__btns-wrapper">
                    <button className="btn btn--default" type="reset">Reset</button>
                    <button className="btn btn--success" type="submit">Apply</button>
                </div>
            </form>
        );
    };
}

export {ContractorForm};
