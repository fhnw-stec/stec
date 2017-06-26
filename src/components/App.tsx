import * as React from 'react';
import {LoadingInProgress, RepoModel, RepoState, StecRootState, Step} from '../types';
import {Alert, Col, Grid, Panel, Row} from 'react-bootstrap';
import StepList from './StepList';
import Readme from './Readme';
import GitHubConfig from './GitHubConfig';

export interface Props {
    readonly state: StecRootState;
    readonly loadSteps: () => void;
    readonly selectStep: (step: Step) => void;
    readonly getDownloadZipUri: (step: Step) => string;
}

const App = ({state, loadSteps, selectStep, getDownloadZipUri}: Props) => {
    return (
        <div className="container">
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <GitHubConfig
                                gitHubUser={state.gitHubUser}
                                gitHubRepo={state.gitHubRepo}
                                refresh={loadSteps}
                            />
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    {renderRepoState(state.repoState, selectStep, getDownloadZipUri)}
                </Row>
            </Grid>
        </div>
    );
};

const renderRepoState = (
    repoModelState: RepoState,
    selectStep: (step: Step) => void,
    getDownloadZipUri: (step: Step) => string) => {
    if (repoModelState instanceof RepoModel) {
        return (
            <div>
                <Col xs={3}>
                    <StepList
                        steps={repoModelState.steps}
                        selectedStep={repoModelState.selectedStep}
                        selectStep={selectStep}
                        getDownloadZipUri={getDownloadZipUri}
                    />
                </Col>
                <Col xs={9}>
                    <Panel>
                        <Readme readme={repoModelState.selectedStep.readme}/>
                    </Panel>
                </Col>
            </div>
        );
    } else if (repoModelState instanceof LoadingInProgress) {
        return <Col xs={12}><Alert bsStyle="info">Loading...</Alert></Col>;
    } else if (repoModelState instanceof Error) {
        return <Col xs={12}><Alert bsStyle="danger">{repoModelState.message}</Alert></Col>;
    } else {
        return <div/>;
    }
};

export default App;