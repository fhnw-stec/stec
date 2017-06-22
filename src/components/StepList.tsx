import * as React from 'react';
import {Step} from '../types';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export interface Props {
    readonly steps: Step[];
}

function StepList({steps}: Props) {
    return (
        <ListGroup>
            {
                steps.map(step =>
                    <ListGroupItem key={step.tag.name}>{step.description}</ListGroupItem>
                )
            }
        </ListGroup>
    );
}

export default StepList;