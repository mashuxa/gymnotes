import React from 'react';
import './style.scss';
import {Avatar} from '../Avatar';
import {ReactComponent as IconSearch} from './assets/search.svg';
import {Map} from "../Map";


class ContractorForm extends React.Component {
    state = {
        avatarSrc: null,
        userName: '',
        userPhone: '',
        userDescription: '',
        userCategoriesId: [
            989, 898, 56, 7668
        ],
        userAddressCoordinates: {
            lat: 53.893009,
            lng: 27.567444,
        },
        userAddress: '',
    };

    setUserName = (e) => {
        this.setState({userName: e.target.value});
    };

    setUserPhone = (e) => {
        this.setState({userPhone: e.target.value});
    };

    setUserDescription = (e) => {
        this.setState({userDescription: e.target.value});
    };

    setUserAddress = (e) => {
        this.setState({userAddress: e.target.value});
    };

    render() {
        const categories = this.state.userCategoriesId.map((categoryId) => {
            return <span key={categoryId}>{categoryId} </span>;
        });
        return (
            <form className="contractor-form" autoComplete="on">
                <div className="contractor-form__avatar-wrapper">
                    <Avatar className="avatar avatar--label" src={this.state.avatarSrc}/>
                </div>
                <label className="contractor-form__label">
                    Your name:
                    <input className="contractor-form__input contractor-form__input--name" placeholder="My name is ..."
                           type="text" value={this.state.userName} onChange={this.setUserName}/>
                </label>
                <label className="contractor-form__label">Your phone number:
                    <input className="contractor-form__input contractor-form__input--phone" placeholder="+375291234567"
                           type="tel" value={this.state.userPhone} onChange={this.setUserPhone}/>
                </label>
                <div className="contractor-form__category-wrapper">
                    {categories}
                </div>
                <div className="contractor-form__search-wrapper">
                    <input type="search" className="contractor-form__input contractor-form__input--category-search"
                           id="contractorCategory"
                           placeholder="Start type category"/>
                    <div className="contractor-form__search-results">

                    </div>
                </div>


                <div className="contractor-form__search-wrapper contractor-form__search-wrapper--address">

                    <input className="contractor-form__input contractor-form__input--address-search" type="search"
                           id="contractorAddress" placeholder="Start type your address" value={this.state.userAddress}
                           onChange={this.setUserAddress}/>
                    <button className='btn' type='button' onClick={this.setUserCoorinates}>
                        <IconSearch className='btn__icon'/>
                    </button>

                    <Map
                        coordinates={this.state.userAddressCoordinates}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiwSm7afWo0wEe4jF9SZz637z_oKLvMWc&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div className='contractor-form__address-map-loader'/>}
                        containerElement={<div className='contractor-form__address-map-wrapper'/>}
                        mapElement={<div className='contractor-form__address-map'/>}
                    />

                </div>


                <textarea className="contractor-form__description" rows="4" placeholder="Tell about you"
                          value={this.state.userDescription} onChange={this.setUserDescription}>
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
