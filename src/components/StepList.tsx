import * as React from 'react';
import {Step} from '../types';
import {Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';

export interface Props {
    readonly steps: Step[];
    readonly selectedStep: Step;
    readonly selectStep: (step: Step) => void;
}

const StepList = ({steps, selectedStep, selectStep}: Props) => {
    const active = (step: Step) => step === selectedStep ? 'active' : '';
    const downloadButton = (step: Step) => step === selectedStep ?
        <a onClick={e => alert('TODO')}><Glyphicon glyph="download"/></a> :
        <div/>;

    return (
        <ListGroup>
            {
                steps.map(step =>
                    <ListGroupItem key={step.tag.name} className={active(step)} onClick={e => selectStep(step)}>
                        {step.title}
                        <span className="pull-right">
                        {downloadButton(step)}
                        </span>
                    </ListGroupItem>
                )
            }
        </ListGroup>
    );
};

export default StepList;