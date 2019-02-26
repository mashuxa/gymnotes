import React from 'react';
import './style.scss';
import {Avatar} from '../Avatar';
import {PLACES_YANDEX_API} from '../../constants';


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

    setUserAddress = (result) => {
        this.setState({
            userAddress: result.properties.GeocoderMetaData.text,
            userAddressCoordinates: {
                lat: result.geometry.coordinates[1],
                lng: result.geometry.coordinates[0]
            }
        });
    };

    setSearchAddressValue = (e) => {
        this.setState({searchAddressValue: e.target.value});
    };

    searchAddress = () => {
        const requestUrl = `https://search-maps.yandex.ru/v1/?apikey=${PLACES_YANDEX_API}&text=${this.state.searchAddressValue}&lang=${navigator.language}`;

        fetch(requestUrl).then(response => response.json())
            .then((results) => {
                this.setState({addressResults: results.features});
            });
    };

    render() {
        const searchAddressResults = Boolean(this.state.addressResults.length) && <div className="contractor-form__search-results">
            {
                this.state.addressResults.map((result) => {
                    return (
                        <div key={result.properties.id} className="contractor-form__search-result" onClick={() => {
                            this.setUserAddress(result);
                        }}>
                            {result.properties.GeocoderMetaData.text}
                        </div>
                    );
                })
            }
        </div>;

        return (
            <form className="contractor-form">
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
                <div className="contractor-form__category-wrapper">+</div>
                <div className="contractor-form__search-wrapper">
                    <input type="search" className="contractor-form__input contractor-form__input--category-search"
                           id="contractorCategory" placeholder="Start type category"/>
                    <div className="contractor-form__search-results">+</div>
                </div>
                {this.state.userAddress ?
                    (<label className="contractor-form__label contractor-form__label--adress">
                        <span>Your address: {this.state.userAddress}</span>
                        <button className="btn btn--edit" type="button" onClick={this.clearUserAddress}>Edit</button>
                    </label>)
                    :
                    (<div className="contractor-form__search-wrapper contractor-form__search-wrapper--address">
                        <input className="contractor-form__input contractor-form__input--address-search" type="search"
                               id="contractorAddress" placeholder="Start type your address"
                               onChange={this.setSearchAddressValue}/>
                        <button onClick={this.searchAddress} type="button">Search!</button>
                        {searchAddressResults}
                    </div>)
                }
                <textarea className="contractor-form__description" rows="4" placeholder="Tell about you"
                          value={this.state.userDescription} onChange={this.setUserDescription}>+
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
