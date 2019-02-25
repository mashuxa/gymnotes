import React from 'react';
import './style.scss';
import {Avatar} from '../Avatar';
import {ReactComponent as IconSearch} from './assets/search.svg';
import {Map} from '../Map';
import {GOOGLE_API_KEY} from '../../constants';


class ContractorForm extends React.Component {
    state = {
        avatarSrc: '',
        userName: '',
        userPhone: '',
        userDescription: '',
        userCategoriesId: [],
        userAddressCoordinates: {
            lat: 0,
            lng: 0
        },
        userAddress: '',

        searchAddressValue: '',
        addressResults: []
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

    clearUserAddress = () => {
        this.setState({userAddress: ''});
    };

    setUserAddress = (e) => {
        this.setState({userAddress: e.target.innerText});
    };

    // componentDidMount() {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         const lat = position.coords.latitude;
    //         const lng = position.coords.longitude;
    //         if (lat && lng) {
    //
    //             this.setState({
    //                 userAddressCoordinates: {
    //                     lat,
    //                     lng
    //                 }
    //             });
    //         }
    //     });
    // }
    setSearchAddressValue = (e) =>{
        this.setState({searchAddressValue: e.target.value});
        const requestUrl = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${GOOGLE_API_KEY}&input=${this.state.searchAddressValue}`;
        console.log(requestUrl);

        fetch(requestUrl).then((response)=>{
            console.log(response);
            console.log(response.JSON());
        }).then(

        );
    };

    render() {
        const categories = this.state.userCategoriesId.map((categoryId) => {
            return <span key={categoryId}>{categoryId} </span>;
        });
        console.log(this.state.searchAddressValue);
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
                           id="contractorCategory" placeholder="Start type category"/>
                    <div className="contractor-form__search-results">

                    </div>
                </div>
                {this.state.userAddress ?
                    <label className="contractor-form__label contractor-form__label--adress">
                        <span>Your address: {this.state.userAddress}</span>
                        <button className="btn btn--edit" type="button" onClick={this.clearUserAddress}>Edit</button>
                    </label>
                    :
                    <div className="contractor-form__search-wrapper contractor-form__search-wrapper--address">
                        <input className="contractor-form__input contractor-form__input--address-search" type="search"
                               id="contractorAddress" placeholder="Start type your address" onChange={this.setSearchAddressValue}/>
                        <div className="contractor-form__search-results">
                            {this.state.addressResults.map((result)=>{
                                return <div key={result} className='contractor-form__search-results' onClick={this.setUserAddress}>{result}</div>
                            })}
                        </div>

                        {/*<Map coordinates={this.state.userAddressCoordinates}*/}
                             {/*googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiwSm7afWo0wEe4jF9SZz637z_oKLvMWc&v=3.exp&libraries=geometry,drawing,places"*/}
                             {/*loadingElement={<div className="contractor-form__address-map-loader"/>}*/}
                             {/*containerElement={<div className="contractor-form__address-map-wrapper"/>}*/}
                             {/*mapElement={<div className="contractor-form__address-map"/>}/>*/}
                    </div>
                }
                <textarea className="contractor-form__description" rows="4" placeholder="Tell about you"
                          value={this.state.userDescription} onChange={this.setUserDescription}>
                    sdfhsdh
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
