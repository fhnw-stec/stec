import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Empty, StecRootState} from './types/index';
import {rootReducer} from './reducers/index';
import {Provider} from 'react-redux';
import App from './containers/App';

const initialState: StecRootState = {
    gitHubConfig: {
        gitHubUser: 'fhnw-stec',
        gitHubRepo: 'stec-mock'
    },
    repoState: new Empty()
};

const loggerMiddleware = require('redux-logger').createLogger();

const store = createStore<StecRootState>(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();