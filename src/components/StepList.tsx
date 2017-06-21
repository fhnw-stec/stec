import * as React from 'react';
import { Step } from '../types';

export interface Props {
    steps: Step[];
    loadSteps: () => void;
}

function StepList({ steps, loadSteps }: Props) {
  return (
    <div>
      <button onClick={loadSteps}>Refresh</button>
      <ul>
        {steps.map(step => <li key={step.tag}>{step.description}</li>)}
      </ul>
    </div>
  );
}

export default StepList;