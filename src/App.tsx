import * as React from 'react';
import './App.css';
import StepList from './components/StepList';

const logo = require('./logo.svg');
const steps = [
  { tag: 'one', description: 'Step 1' },
  { tag: 'two', description: 'Step 1' }
];

class App extends React.Component<{}, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to STEC</h2>
        </div>
        <StepList steps={steps} />
      </div>
    );
  }
}

export default App;
