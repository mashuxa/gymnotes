import React from 'react';
import './style.scss';
import {Avatar} from '../Avatar';
import {Preloader} from '../Preloader';
// import validateUser from '../common/validateUser';
import {API_URL} from '../../constants';


class ContractorForm extends React.Component {
    state = {
        isLoading: true,
        avatarSrc: '',
        name: '',
        phone: '',
        description: '',
        userCategoriesId: [],
    };

    setName = (e) => {
        this.setState({name: e.target.value});
    };

    setPhone = (e) => {
        this.setState({phone: e.target.value});
    };

    setDescription = (e) => {
        this.setState({description: e.target.value});
    };

    getUserData = () => {
        const url = `${API_URL}/settings`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            if (result.success) {
                this.setState({
                    name: result.data.name || '',
                    phone: result.data.phone || '',
                    description: result.data.description || '',
                    isLoading: false,
                });

                console.log(this.state);
            } else {
                console.error(`Access denied! ${result.message}`);
                this.props.history.push('/login');
            }
        });
    };

    updateUserData = (e) => {
        e.preventDefault();

        const url = `${API_URL}/settings`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(this.state),
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            console.log('Your account was updated!');
        });
    };

    componentDidMount() {
        this.getUserData();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? <Preloader/> : (
                    <form className="contractor-form">
                        <div className="contractor-form__avatar-wrapper">
                            <Avatar className="avatar avatar--label" src={this.state.avatarSrc} isFileInput={true}/>
                        </div>
                        <label className="contractor-form__label">
                            Your name:
                            <input className="contractor-form__input contractor-form__input--name"
                                   placeholder="My name is ..."
                                   type="text" value={this.state.name} onChange={this.setName} name="name"/>
                        </label>
                        <label className="contractor-form__label">Your phone number:
                            <input className="contractor-form__input contractor-form__input--phone"
                                   placeholder="+375291234567"
                                   type="tel" value={this.state.phone} onChange={this.setPhone} name="phone"/>
                        </label>
                        <div className="contractor-form__category-wrapper">Categories will be here</div>
                        <div className="contractor-form__search-wrapper">
                            <input type="search"
                                   className="contractor-form__input contractor-form__input--category-search"
                                   id="contractorCategory" placeholder="Start type category"/>
                        </div>
                        <textarea className="contractor-form__description" rows="4" placeholder="Tell about you"
                                  value={this.state.description} onChange={this.setDescription} name="description">
                        </textarea>
                        <div className="contractor-form__btns-wrapper">
                            <button className="btn btn--default" type="button" onClick={this.getUserData}>Reset</button>
                            <button className="btn btn--success" type="submit" onClick={this.updateUserData}>Apply
                            </button>
                        </div>
                    </form>
                )}
            </React.Fragment>
        );
    };
}

export {ContractorForm};
