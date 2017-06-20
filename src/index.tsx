import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StepList from './containers/StepList';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore } from 'redux';
import { StoreState } from './types/index';
import { loadTags } from './reducers/index';
import { Provider } from 'react-redux';

const store = createStore<StoreState>(loadTags, {
  steps: []
});

ReactDOM.render(
  <Provider store={store}>
    <StepList />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
