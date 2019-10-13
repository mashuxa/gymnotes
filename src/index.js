import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {App} from './components/App';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './containers/Home';
import UserSchedule from './containers/UserSchedule';
import UserSettings from './containers/UserSettings';
import Login from './containers/Login';
import Registration from './containers/Registration';
import {Terms} from './components/Terms';
import {Policy} from './components/Policy';
import {AccessDenied} from './components/AccessDenied';
import ContractorCalendar from './containers/ContractorCalendar';
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
                    <Route path='/calendar' component={() => <UserSchedule store={store}/>}/>
                    <Route path='/settings' component={() => <UserSettings store={store}/>}/>
                    <Route path='/login' component={() => <Login store={store}/>}/>
                    <Route path='/registration' component={() => <Registration store={store}/>}/>
                    <Route path='/user/:id' component={() => <ContractorCalendar store={store}/>}/>
                    <Route path='/terms' component={Terms}/>
                    <Route path='/policy' component={Policy}/>
                    <Route path='/access-denied' component={AccessDenied}/>
                    <Route path='*' component={Error}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
