import * as React from 'react';
import {Step} from '../types';
import {Button, Grid, ListGroup, ListGroupItem, Row, Col} from 'react-bootstrap';

export interface Props {
    steps: Step[];
    loadSteps: () => void;
}

function StepList({steps, loadSteps}: Props) {
    return (
        <Grid>
            <Row>
                <Col><Button onClick={loadSteps}>Refresh</Button></Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {
                            steps.map(step =>
                                <ListGroupItem key={step.tag.name}>{step.description}</ListGroupItem>
                            )
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Grid>
    );
}

export default StepList;