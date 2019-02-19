import React from 'react';
import './style.scss';
import {ReactComponent as Plus} from './assets/plus.svg';
import { Avatar } from '../Avatar';

class ContractorForm extends React.Component {
    render() {
        return (
            <form className="contractor-form" autoComplete="on">
                <div className="contractor-form__avatar-wrapper">
                    <Avatar className='avatar avatar--label'/>
                </div>
                <label className="contractor-form__label">
                    Your name:
                    <input className="contractor-form__name" placeholder="My name is ..." type="text"/>
                </label>

                <label className="contractor-form__label">Your phone number:
                    <input className="contractor-form__phone" placeholder="+375291234567" type="tel"/>
                </label>

                <div className="contractor-form__category-tags-wrapper">
                    "category-tag--removable"
                </div>
                <div className="contractor-form__category-select-wrapper">
                    <select className="category-tag contractor-form__category-select" id="contractorCategory">
                        <option defaultValue disabled>Add new</option>
                        <optgroup label="Category">
                            <option value="subcategory1">subcategory1</option>
                            <option value="subcategory2">subcategory2</option>
                            <option value="subcategory3">subcategory3</option>
                        </optgroup>
                        <optgroup label="Category">
                            <option value="subcategory1">subcategory1</option>
                            <option value="subcategory2">subcategory2</option>
                            <option value="subcategory3">subcategory3</option>
                        </optgroup>
                    </select>
                    <button className="contractor-form__category-select-btn">

                        <Plus className='contractor-form__category-select-icon'/>
                    </button>
                </div>
                <div className="contractor-form__category-select-wrapper">
                    <select className="category-tag contractor-form__category-select" id="contractorCountry">
                        <option defaultValue disabled>Your country</option>
                        <option value="subcategory1">Belarus</option>
                        <option value="subcategory2">Russia</option>
                        <option value="subcategory3">Ukrain</option>
                    </select>
                </div>
                <div className="contractor-form__category-select-wrapper">
                    <select className="category-tag contractor-form__category-select" id="contractorCity">
                        <option defaultValue disabled>Your city or suburban area</option>
                        <option value="Minsk">Minsk</option>
                        <option value="subcategory2">Brest</option>
                        <option value="subcategory3">Grodno</option>
                        <option value="subcategory1">Logoisk</option>
                        <option value="subcategory1">Logoisk</option>
                        <option value="subcategory1">Logoisk</option>
                        <option value="subcategory1">Logoisk</option>
                    </select>
                </div>
                <div className="contractor-form__category-select-wrapper">
                    <input className="category-tag contractor-form__category-select" type="text" id="contractorAddress"
                           placeholder="Your address"/>
                </div>
                <textarea className="contractor-form__description" rows="4" placeholder="Tell about you"></textarea>
                <div className="contractor-form__btns-wrapper">
                    <button className="btn btn--default" type="reset">Reset</button>
                    <button className="btn btn--success" type="submit">Apply</button>
                </div>
            </form>
        )
    };
}

export {ContractorForm};
