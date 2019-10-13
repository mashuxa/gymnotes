import './style.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {API_URL} from '../../constants';
import {connect} from "react-redux";
import * as actions from "../../actions";

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    };

    setEmail = (e) => {
        this.props.store.dispatch(actions.setAuthData({email: e.target.value}));
    };
    setPassword = (e) => {
        this.props.store.dispatch(actions.setAuthData({password: e.target.value}));
    };

    validateForm = () => {
        return true;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm()) {
            fetch(`${API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: this.props.email,
                    password: this.props.password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(result => {
                return result.ok ? result.json() : result;
            }).then(data => {
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('email', data.email);
                    this.props.history.push('/');
                } else {
                    console.log('Incorrect password or email');
                }
            });
        } else {
            console.error('check inputs');
        }
    };

    render() {
        return (
            <form className="login" name="login" onSubmit={this.handleSubmit}>
                <h1>Log In</h1>
                <input className="login__input" onChange={this.setEmail} value={this.props.email} placeholder="Login"
                       type="text" name="email"/>
                <input className="login__input" onChange={this.setPassword} value={this.props.password}
                       placeholder="Password" type="password" name="password"/>
                <button className="login__btn" type="submit">Send</button>
                <hr/>
                <div>
                    <span>Don't have any account yet? </span>
                    <Link exact="true" to="/registration" className="login__link">Register</Link>
                </div>
            </form>);
    }
}

const mapStateToProps = state => {
    return {
        email: state.authReducer.email,
        password: state.authReducer.password,
    };
};

export default connect(mapStateToProps)(Login);
