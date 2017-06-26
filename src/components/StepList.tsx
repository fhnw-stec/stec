import * as React from 'react';
import {Step} from '../types';
import {Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';

export interface Props {
    readonly steps: Step[];
    readonly selectedStep: Step;
    readonly selectStep: (step: Step) => void;
    readonly getDownloadZipUri: (step: Step) => string;
}

const StepList = ({steps, selectedStep, selectStep, getDownloadZipUri}: Props) => {
    const active = (step: Step) => step === selectedStep ? 'active' : '';
    const downloadButton = (step: Step) => step === selectedStep ?
        <a href={getDownloadZipUri(step)}><Glyphicon glyph="download"/></a> :
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