import './style.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {API_URL} from '../../constants';

class Registration extends React.Component {
    state = {
        email: 'mashuxa',
        password: '12345',
        repeatPassword: '12345',
        agreements: true,
    };

    setEmail = (e) => {
        this.setState({email: e.target.value});
    };
    setPassword = (e) => {
        this.setState({password: e.target.value});
    };
    setRepeatPassword = (e) => {
        this.setState({repeatPassword: e.target.value});
    };
    setAgreements = (e) => {
        this.setState({agreements: e.target.checked});
    };

    validateForm = () => {
        return true;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm()) {
            fetch(`${API_URL}/registration`, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => {
                return result.ok ? result.json() : result;
            }).then(data => {
                if(data.success){
                    this.props.history.push('/login');
                    console.log(data);
                } else {
                    console.log(data);
                }
            });
        } else {
            console.error('check inputs');
        }
    };

    render() {
        return (
            <form className='registration' name='registration' onSubmit={this.handleSubmit}>
                <h1>Registration</h1>
                <input className="registration__input" onChange={this.setEmail} value={this.state.email}
                       placeholder="Email" type="text" name="mail"/>
                <input className="registration__input" onChange={this.setPassword} value={this.state.password}
                       placeholder="Password" type="text" name="password"/>
                <input className="registration__input" onChange={this.setRepeatPassword}
                       value={this.state.repeatPassword} placeholder="Repeat password" type="text"
                       name="repeatPassword"/>
                <label className="registration__label">
                    <input className="registration__checkbox" onChange={this.setAgreements}
                           value={this.state.agreements} checked={this.state.agreements} type="checkbox"
                           name="agreements"/>
                    <span>
                        I agree to the QuickPick <Link className="registration__link"
                                                       to='/terms'>Terms of Service</Link> and <Link
                        className="registration__link" to='/policy'>Privacy Policy</Link>
                    </span>
                </label>
                <button className="registration__btn" type="submit">Send</button>
                <hr/>
                <div>
                    <span>Already have an account? </span>
                    <Link exact="true" to='/login' className="registration__link">
                        Log in
                    </Link>
                </div>
            </form>);
    }
}

export {Registration};
