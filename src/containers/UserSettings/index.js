import React from 'react';
import './style.scss';
import {Avatar} from '../../components/Avatar';
import {Preloader} from '../../components/Preloader';
import {API_URL} from '../../constants';
import * as actions from '../../actions';
import {connect} from "react-redux";

class UserSettings extends React.Component {
    constructor(props) {
        super(props);

        this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount() {
        this.getUserData();
    }

    setName = (e) => {
        this.props.store.dispatch(actions.setUserData({name: e.target.value}));
    };

    setPhone = (e) => {
        this.props.store.dispatch(actions.setUserData({phone: e.target.value}));
    };

    setDescription = (e) => {
        this.props.store.dispatch(actions.setUserData({description: e.target.value}));
    };

    getUserData = () => {
        const url = `${API_URL}/settings`;

        this.props.store.dispatch(actions.setUserData({isLoading: true}));

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
                const userData = {
                    name: result.data.name || '',
                    phone: result.data.phone || '',
                    description: result.data.description || '',
                    avatarSrc: result.data.avatarSrc ? `${API_URL}${result.data.avatarSrc}` : '',
                    isLoading: false,
                };

                this.props.store.dispatch(actions.setUserData(userData));
            } else {
                console.error(`Access denied! ${result.message}`);
                this.props.history.push('/login');
            }
        });
    };

    updateUserData = (e) => {
        e.preventDefault();

        const url = `${API_URL}/settings`;
        const formData = new FormData();

        this.props.store.dispatch(actions.setUserData({isUpdating: true}));

        formData.set('avatar', this.props.avatar);
        formData.set('name', this.props.name);
        formData.set('phone', this.props.phone);
        formData.set('description', this.props.description);
        formData.set('phone', this.props.phone);

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            body: formData,
        }).then(result => {
            return result.ok ? result.json() : result;
        }).then(result => {
            if (result.success) {
                const userData = {
                    name: result.data.name || '',
                    phone: result.data.phone || '',
                    description: result.data.description || '',
                    avatarSrc: result.data.avatarSrc ? `${API_URL}${result.data.avatarSrc}` : '',
                    avatar: null,
                    isUpdating: false,
                };
                this.props.store.dispatch(actions.setUserData(userData));
            } else {
                this.props.store.dispatch(actions.setUserData({
                    isUpdating: false,
                    avatar: null
                }));
            }
        });
    };

    uploadImage(e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        this.props.store.dispatch(actions.setUserData({
            avatarSrc: url,
            avatar: file
        }));

        URL.revokeObjectURL(file);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.isLoading ? <Preloader/> : (
                    <form className="contractor-form">
                        <div className="contractor-form__avatar-wrapper">
                            <Avatar src={this.props.avatarSrc} isFileInput={true} onChangeAvatar={this.uploadImage}/>
                        </div>
                        <label className="contractor-form__label">
                            Your name:
                            <input className="contractor-form__input contractor-form__input--name"
                                   placeholder="My name is ..."
                                   type="text" value={this.props.name} onChange={this.setName} name="name"/>
                        </label>
                        <label className="contractor-form__label">Your phone number:
                            <input className="contractor-form__input contractor-form__input--phone"
                                   placeholder="375291234567"
                                   type="tel" value={this.props.phone} onChange={this.setPhone} name="phone"/>
                        </label>
                        <textarea className="contractor-form__description" rows="4" placeholder="Tell about you"
                                  value={this.props.description} onChange={this.setDescription} name="description">
                        </textarea>
                        {this.props.isUpdating ? <Preloader/> :
                            <div className="contractor-form__btns-wrapper">
                                <button className="btn btn--default" type="button" onClick={this.getUserData}>Reset
                                </button>
                                <button className="btn btn--success" type="submit" onClick={this.updateUserData}>Apply
                                </button>
                            </div>
                        }
                    </form>
                )}
            </React.Fragment>
        );
    };
}

const mapStateToProps = state => {
    return {
        isLoading: state.userSettingsReducer.isLoading,
        isUpdating: state.userSettingsReducer.isUpdating,
        avatarSrc: state.userSettingsReducer.avatarSrc,
        avatar: state.userSettingsReducer.avatar,
        name: state.userSettingsReducer.name,
        phone: state.userSettingsReducer.phone,
        description: state.userSettingsReducer.description,
    };
};

export default connect(mapStateToProps)(UserSettings);
