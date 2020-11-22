import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import thunk from 'redux-thunk'
import {fetchAuthenticated} from './actions/account';
import Root from './components/root'
import rootReducer from './reducers';
import AccountDragons from './components/accountDragons';
import PublicDragons from './components/publicDragons';
import history from './history';
import './css/index';


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
                        <AuthRoute
                            path='/public-dragons'
                            component={PublicDragons}
                        />
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById("root")
        );
    });
