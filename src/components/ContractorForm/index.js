import React from 'react';
import './style.scss';
import {Avatar} from '../Avatar';
import {Preloader} from '../Preloader';
import {API_URL} from '../../constants';


class ContractorForm extends React.Component {
    constructor(props) {
        super(props);

        this.uploadImage = this.uploadImage.bind(this);
    }

    state = {
        isLoading: true,
        isUpdating: false,
        avatarSrc: '',
        avatar: null,
        name: '',
        phone: '',
        description: '',
    };

    componentDidMount() {
        this.getUserData();
    }

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

        this.setState({
            isUpdating: true,
        });

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
                    avatarSrc: result.data.avatarSrc ? `${API_URL}${result.data.avatarSrc}` : '',
                    isUpdating: false,
                    isLoading: false,
                });
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

        this.setState({
            isUpdating: true,
        });

        formData.set('avatar', this.state.avatar);
        formData.set('name', this.state.name);
        formData.set('phone', this.state.phone);
        formData.set('description', this.state.description);
        formData.set('phone', this.state.phone);

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
                this.setState({
                    name: result.data.name || '',
                    phone: result.data.phone || '',
                    description: result.data.description || '',
                    avatarSrc: result.data.avatarSrc ? `${API_URL}${result.data.avatarSrc}` : '',
                    avatar: null,
                    isUpdating: false,
                    isLoading: false,
                });
            } else {
                this.setState({
                    isUpdating: false,
                    isLoading: false,
                    avatar: null,
                });
            }
        });
    };

    uploadImage(e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        this.setState({
            avatarSrc: null,
        });
        this.setState({
            avatarSrc: url,
            avatar: file
        });
        URL.revokeObjectURL(file);
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? <Preloader/> : (
                    <form className="contractor-form">
                        <div className="contractor-form__avatar-wrapper">
                            <Avatar src={this.state.avatarSrc} isFileInput={true} onChangeAvatar={this.uploadImage}/>
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
                        <textarea className="contractor-form__description" rows="4" placeholder="Tell about you"
                                  value={this.state.description} onChange={this.setDescription} name="description">
                        </textarea>
                        {this.state.isUpdating ? <Preloader/> :
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

export {ContractorForm};
