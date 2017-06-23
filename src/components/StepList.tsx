import * as React from 'react';
import {Step} from '../types';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export interface Props {
    readonly steps: Step[];
    readonly selectedStep: Step;
    readonly selectStep: (step: Step) => void;
}

const StepList = ({steps, selectedStep, selectStep}: Props) => {
    const active = (step: Step) => step === selectedStep ? 'active' : '';

    return (
        <ListGroup>
            {
                steps.map(step =>
                    <ListGroupItem key={step.tag.name} className={active(step)} onClick={e => selectStep(step)}>
                        {step.title}
                    </ListGroupItem>
                )
            }
        </ListGroup>
    );
};

export default StepList;