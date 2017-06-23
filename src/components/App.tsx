import * as React from 'react';
import {LoadingInProgress, RepoModel, RepoState, StecRootState} from '../types';
import {Alert, Button, Col, Grid, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import StepList from './StepList';
import Readme from './Readme';

export interface Props {
    readonly state: StecRootState;
    readonly loadSteps: () => void;
}

const App = ({state, loadSteps}: Props) => {
    return (
        <div className="container">
            <Grid>
                <Row>
                    <Col>
                        <div>{state.gitHubUser}/{state.gitHubRepo}</div>
                    </Col>
                    <Col><Button onClick={loadSteps}>Refresh</Button></Col>
                </Row>
                <Row>
                    {renderRepoState(state.repoState)}
                </Row>
            </Grid>
        </div>
    );
};

const renderRepoState = (repoModelState: RepoState) => {
    if (repoModelState instanceof RepoModel) {
        return (
            <div>
                <Col xs={6}><StepList steps={repoModelState.steps}/></Col>
                <Col xs={6}>
                    <ListGroup>
                        <ListGroupItem>
                            <Readme readme={repoModelState.steps[0].readme}/>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </div>
        );
    } else if (repoModelState instanceof LoadingInProgress) {
        return <div>Loading...</div>;
    } else if (repoModelState instanceof Error) {
        return <Alert bsStyle="danger">{repoModelState.message}</Alert>;
    } else {
        return <div/>;
    }
};

export default App;