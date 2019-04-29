import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Home} from './containers/Home';
import {MyCalendar} from './containers/MyCalendar';
import {ContractorForm} from './components/ContractorForm';
import {ContractorCalendar} from './containers/ContractorCalendar';
import {Login} from './components/Login';
import {Registration} from './components/Registration';
import {Terms} from './containers/Terms';
import {Policy} from './containers/Policy';
import {Error} from './containers/Error';


ReactDOM.render((
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/calendar' component={MyCalendar}/>
                <Route path='/settings' component={ContractorForm}/>
                <Route path='/contractor-calendar' component={ContractorCalendar}/>
                <Route path='/login' component={Login}/>
                <Route path='/registration' component={Registration}/>
                <Route path='/terms' component={Terms}/>
                <Route path='/policy' component={Policy}/>
                <Route path='*' component={Error}/>
            </Switch>
        </App>
    </BrowserRouter>
), document.getElementById('root'));
