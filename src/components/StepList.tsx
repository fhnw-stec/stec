import * as React from 'react';
import { Step } from '../models';

export interface Props {
  steps: Array<Step>;
}

function StepList({ steps }: Props) {
  return (
    <ul>
      {steps.map(step => <li key={step.tag}>{step.description}</li>)}
    </ul>
  );
}

export default StepList;