import * as React from 'react';
import {LoadingInProgress, RepoModel, RepoState, StecRootState} from '../types';
import {Button, Col, Grid, Row} from 'react-bootstrap';
import StepList from './StepList';

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
                    {render(state.repoState)}
                </Row>
            </Grid>
        </div>
    );
};

const render = (repoModelState: RepoState) => {
    if (repoModelState instanceof RepoModel) {
        return <StepList steps={repoModelState.steps}/>;
    } else if (repoModelState instanceof LoadingInProgress) {
        return <div>Loading...</div>;
    } else if (repoModelState instanceof Error) {
        return <div>{repoModelState.message}</div>;
    } else {
        return <div/>;
    }
};

export default App;