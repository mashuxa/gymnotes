import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Home} from './containers/Home';
import {MyCalendar} from './containers/MyCalendar';
import {ContractorForm} from './components/ContractorForm';
import {ContractorCalendar} from './containers/ContractorCalendar';
import {Enter} from './containers/Enter';
import {Error} from './containers/Error';


ReactDOM.render((
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact="true" path='/' component={Home}/>
                <Route path='/my-calendar' component={MyCalendar}/>
                <Route path='/settings' component={ContractorForm}/>
                <Route path='/contractor-calendar' component={ContractorCalendar}/>
                <Route path='/enter' component={Enter}/>
                <Route path='*' component={Error}/>
            </Switch>
        </App>
    </BrowserRouter>
), document.getElementById('root'));
