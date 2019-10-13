import './style.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {API_URL} from '../../constants';
import * as actions from '../../actions';
import {connect} from "react-redux";

class Registration extends React.Component {
    setEmail = (e) => {
        this.props.store.dispatch(actions.setEmail(e.target.value));
    };
    setPassword = (e) => {
        this.props.store.dispatch(actions.setPassword(e.target.value));
    };
    setRepeatPassword = (e) => {
        this.props.store.dispatch(actions.setRepeatPassword(e.target.value));
    };
    setAgreements = (e) => {
        this.props.store.dispatch(actions.setAgreements(e.target.value));
    };

    validateForm = () => {
        return true;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm()) {
            fetch(`${API_URL}/registration`, {
                method: 'POST',
                body: JSON.stringify({
                    email: this.props.email,
                    password: this.props.password,
                    repeatPassword: this.props.repeatPassword,
                    agreements: this.props.agreements,
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => {
                return result.ok ? result.json() : result;
            }).then(data => {
                if (data.success) {
                    this.props.history.push('/login');
                } else {
                    console.error(data);
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
                <input className="registration__input" onChange={this.setEmail} value={this.props.email}
                       placeholder="Login" type="text" name="mail"/>
                <input className="registration__input" onChange={this.setPassword} value={this.props.password}
                       placeholder="Password" type="password" name="password"/>
                <input className="registration__input" onChange={this.setRepeatPassword}
                       value={this.props.repeatPassword} placeholder="Repeat password" type="password"
                       name="repeatPassword"/>
                <label className="registration__label">
                    <input className="registration__checkbox" onChange={this.setAgreements}
                           value={this.props.agreements} checked={this.props.agreements} type="checkbox"
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

const mapStateToProps = state => {
    return {
        email: state.authReducer.email,
        password: state.authReducer.password,
        repeatPassword: state.authReducer.repeatPassword,
        agreements: state.authReducer.agreements,
    };
};

export default connect(mapStateToProps)(Registration);
