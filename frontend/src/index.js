import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {fetchAuthenticated} from './actions/account';
import thunk from 'redux-thunk'
import Root from './components/root'
import rootReducer from './reducers';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import AccountDragonRow from './components/accountDragonRow';
import AccountDragons from './components/accountDragons';
import './css/index';

const history = createBrowserHistory();

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

const AuthRoute = (props) => {
    if (!store.getState().account.loggedIn) {
        return (
            <Redirect to={{pathname: '/'}}/>
        );
    }
    const {component, path} = props;
    return <Route path={path} component={component}/>;
}

store.dispatch(fetchAuthenticated())
    .then(() => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route
                            exact={true}
                            path='/'
                            component={Root}
                        />
                        <AuthRoute
                            path='/account-dragons'
                            component={AccountDragons}
                        />
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById("root")
        );
    });
