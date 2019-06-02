import React from 'react';
import './style.scss';
import {Avatar} from '../Avatar';
// import validateUser from '../common/validateUser';
import {API_URL} from '../../constants';


class ContractorForm extends React.Component {
    state = {
        avatarSrc: '',
        name: '',
        phone: '',
        description: '',
        userCategoriesId: [],
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

    getUserData = () => {
        const url = `${API_URL}/settings`;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                email: localStorage.getItem('email'),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            if (result.success) {
                for (let prop in result.data) {
                    document.getElementsByName(prop)[0].value = result.data[prop];
                }
            } else {
                console.error(`Access denied! ${result.message}`);
                this.props.history.push('/login');
            }
        });
    };

    componentDidMount() {
        this.getUserData();
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
                           type="text" value={this.state.userName} onChange={this.setUserName} name="name"/>
                </label>
                <label className="contractor-form__label">Your phone number:
                    <input className="contractor-form__input contractor-form__input--phone" placeholder="+375291234567"
                           type="tel" value={this.state.userPhone} onChange={this.setUserPhone} name="phone"/>
                </label>
                <div className="contractor-form__category-wrapper">Categories will be here</div>
                <div className="contractor-form__search-wrapper">
                    <input type="search" className="contractor-form__input contractor-form__input--category-search"
                           id="contractorCategory" placeholder="Start type category"/>
                </div>
                <textarea className="contractor-form__description" rows="4" placeholder="Tell about you"
                          value={this.state.userDescription} onChange={this.setUserDescription} name="description">
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
