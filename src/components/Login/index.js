import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../constants';
import { Logo } from '../Logo';


class Login extends React.Component {
    state = {
        email: 'mashuxa',
        password: '12345',
    };

    setEmail = (e) => {
        this.setState({email: e.target.value});
    };
    setPassword = (e) => {
        this.setState({password: e.target.value});
    };

    validateForm = () => {
        return true;
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm()) {
            fetch(`${API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify(this.state),
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
                <input className="login__input" onChange={this.setEmail} value={this.state.email} placeholder="Email"
                       type="text" name="email"/>
                <input className="login__input" onChange={this.setPassword} value={this.state.password}
                       placeholder="Password" type="text" name="password"/>
                <button className="login__btn" type="submit">Send</button>
                <hr/>
                <div>
                    <span>Don't have any account yet? </span>
                    <Link exact="true" to="/registration" className="login__link">Register</Link>
                </div>
            </form>);
    }
}

export { Login };
