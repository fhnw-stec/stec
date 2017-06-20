import * as React from 'react';
import { Step } from '../types';

export interface Props {
  steps: Array<Step>;
  loadTags: () => void;
}

function StepList({ steps, loadTags }: Props) {
  return (
    <div>
      <button onClick={loadTags}>Refresh</button>
      <ul>
        {steps.map(step => <li key={step.tag}>{step.description}</li>)}
      </ul>
    </div>
  );
}

export default StepList;