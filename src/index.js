import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {App} from './components/App';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './containers/Home';
import {MyCalendar} from './components/MyCalendar';
import {ContractorForm} from './components/ContractorForm';
import {Login} from './components/Login';
import {Registration} from './components/Registration';
import {Terms} from './components/Terms';
import {Policy} from './components/Policy';
import {AccessDenied} from './components/AccessDenied';
import {UserCalendar} from './components/UserCalendar';
import {Error} from './components/Error';

import {createStore} from 'redux';
import rootReducer from './reducers';
import initialState from './initialState';

const store = createStore(rootReducer, initialState);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path='/' component={() => <Home store={store}/>}/>
                    <Route path='/calendar' component={MyCalendar}/>
                    <Route path='/settings' component={ContractorForm}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Registration}/>
                    <Route path='/terms' component={Terms}/>
                    <Route path='/policy' component={Policy}/>
                    <Route path='/access-denied' component={AccessDenied}/>
                    <Route path='/user/:id' component={UserCalendar}/>
                    <Route path='*' component={Error}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
