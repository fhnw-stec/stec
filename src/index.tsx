import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StepList from './containers/StepList';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { StoreState } from './types/index';
import { rootReducer } from './reducers/index';
import { Provider } from 'react-redux';

const initialState = { steps: [] };

const store = createStore<StoreState>(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <StepList />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();