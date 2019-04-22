import './style.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {API_URL} from '../../constants';

class Registration extends React.Component {
    state = {
        login: '',
        password: '',
        repeatPassword: '',
        agreements: false,
    };

    setLogin = (e) => {
        this.setState({login: e.target.value});
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

        if(this.validateForm()){
            fetch(`${API_URL}/registration`, {
                method: 'POST',
                body: new FormData(e.target),
            }).then(result =>{
                return result.ok ? result.json() : "error";
            }).then(data =>{
               console.log(data);
            });
        } else {
            console.error('check inputs');
        }
    };

    render() {
        return (
            <form className='registration' name='registration' onSubmit={this.handleSubmit}>
                <h1>Registration</h1>
                <input className="registration__input" onChange={this.setLogin} value={this.state.login} placeholder="Login" type="text" name="login"/>
                <input className="registration__input" onChange={this.setPassword} value={this.state.password} placeholder="Password" type="text" name="password"/>
                <input className="registration__input" onChange={this.setRepeatPassword} value={this.state.repeatPassword} placeholder="Repeat password" type="text" name="repeatPassword"/>
                <label className="registration__label">
                    <input className="registration__checkbox" onChange={this.setAgreements} value={this.state.agreements} type="checkbox" name="agreements"/>
                    <span>
                        I agree to the QuickPick <Link className="registration__link" to='/terms'>Terms of Service</Link> and <Link className="registration__link" to='/policy'>Privacy Policy</Link>
                    </span>
                </label>
                <button className="registration__btn" type="submit">Send</button>
                <hr/>
                <div>
                    <span>Already have an account?</span> <span className="registration__link">Sign in</span>
                </div>
            </form>);
    }
}

export {Registration};
