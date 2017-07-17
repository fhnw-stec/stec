import * as React from 'react';
import { LoadingInProgress, RepoModel, RepoState, Step } from '../types/index';
import { Alert, Col, Panel, Row } from 'react-bootstrap';
import StepList from './StepList';
import Readme from './Readme';

export interface Props {
    readonly repoState: RepoState;
    readonly selectStep: (step: Step) => void;
    readonly downloadZipUri: (step: Step) => string;
}

const Repo = ({repoState, selectStep, downloadZipUri}: Props) => {
    if (repoState instanceof RepoModel) {
        if (repoState.steps.length === 0) {
            return <Alert bsStyle="info">No annotated tags</Alert>;
        } else {
            return (
                <Row>
                    <Col xs={3}>
                        <StepList
                            steps={repoState.steps}
                            selectedStep={repoState.selectedStep}
                            selectStep={selectStep}
                            downloadZipUri={downloadZipUri}
                        />
                    </Col>
                    <Col xs={9}>
                        <Panel>
                            <Readme readme={repoState.selectedStep.readme}/>
                        </Panel>
                    </Col>
                </Row>
            );
        }
    } else if (repoState instanceof LoadingInProgress) {
        return <Alert bsStyle="info">Loading...</Alert>;
    } else if (repoState instanceof Error) {
        return <Alert bsStyle="danger">{repoState.message}</Alert>;
    } else {
        return <div/>;
    }
};

export default Repo;