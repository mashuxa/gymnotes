import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createStore} from 'redux';
import App from './components/App';
import rootReducer from './reducers';
import History from './containers/History';
import CurrentActivity from './containers/CurrentActivity';
import ExerciseList from './containers/ExerciseList';
import Error from './containers/Error';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path='/' component={History} />
                    <Route exact path='/current-activity' component={CurrentActivity} />
                    <Route exact path='/exercise-list' component={ExerciseList} />
                    <Route path='*' component={Error} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
), document.getElementById('gymnotes'));
