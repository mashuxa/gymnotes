import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './containers/App';
import reducer from './reducers';
import ExercisesHistory from './containers/ExercisesHistory';
import ExerciseList from './containers/ExerciseList';
import Error from './containers/Error';

const store = createStore( reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path='/exercises-list' component={ExerciseList} />
                    <Route exact path='/exercises-history' component={ExercisesHistory} />
                    <Route path='*' component={Error} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
), document.getElementById('gymnotes'));
