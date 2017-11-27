import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Empty, StecRootState } from './types/index';
import { reducer } from './reducers/index';
import { Provider } from 'react-redux';
import App from './containers/App';

const urlSearchParams = new URLSearchParams(window.location.search);

const getUrlParam = (name: string, defaultValue: string): string => {
    const value = urlSearchParams.get(name);
    return value === null ? defaultValue : value.trim();
};

const initialState: StecRootState = {
    gitHubConfig: {
        gitHubUser: getUrlParam('github-user', 'fhnw-stec'),
        gitHubRepo: getUrlParam('github-repo', 'stec-mock'),
        accessToken: getUrlParam('id', '')
    },
    repoState: new Empty()
};

const loggerMiddleware = require('redux-logger').createLogger();

const store = createStore<StecRootState>(
    reducer,
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