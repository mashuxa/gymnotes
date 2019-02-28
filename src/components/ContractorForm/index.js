import React from 'react';
import './style.scss';
import {Avatar} from '../Avatar';
import {API_URL} from '../../constants';


class ContractorForm extends React.Component {
    state = {
        avatarSrc: '',
        userName: '',
        userPhone: '',
        userDescription: '',
        userCategoriesId: []
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

    fetchData = (url, callback) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((responseAsJson) => {
                callback(responseAsJson);
            })
            .catch((error) => {
                console.error('Looks like there was a problem: ', error);
            });
    };

    componentDidMount() {
        const url = `${API_URL}/user-data/response.json`;
        this.fetchData(url, (data) => {
            console.log(data);
        });
    }

    render() {
        return (
            <form className="contractor-form">
                <div className="contractor-form__avatar-wrapper">
                    <Avatar className="avatar avatar--label" src={this.state.avatarSrc} isFileInput={true}/>
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
                <div className="contractor-form__category-wrapper">Categories will be here</div>
                <div className="contractor-form__search-wrapper">
                    <input type="search" className="contractor-form__input contractor-form__input--category-search"
                           id="contractorCategory" placeholder="Start type category"/>
                </div>
                <textarea className="contractor-form__description" rows="4" placeholder="Tell about you"
                          value={this.state.userDescription} onChange={this.setUserDescription}></textarea>
                <div className="contractor-form__btns-wrapper">
                    <button className="btn btn--default" type="reset">Reset</button>
                    <button className="btn btn--success" type="submit">Apply</button>
                </div>
            </form>
        );
    };
}

export {ContractorForm};
