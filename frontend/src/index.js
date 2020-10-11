import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import Generation from './components/generation'
import Dragon from './components/dragon'
import rootReducer from './reducers';
import './css/index';

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <div>
            <h2>DragonStack</h2>
            <Generation/>
            <Dragon/>
        </div>
    </Provider>,
    document.getElementById("root")
);
