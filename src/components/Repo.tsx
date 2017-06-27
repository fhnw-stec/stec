import * as React from 'react';
import {LoadingInProgress, RepoModel, RepoState, Step} from '../types/index';
import {Alert, Col, Panel, Row} from 'react-bootstrap';
import StepList from './StepList';
import Readme from './Readme';

export interface Props {
    readonly repoModelState: RepoState;
    readonly selectStep: (step: Step) => void;
    readonly downloadZipUri: (step: Step) => string;
}

const Repo = ({repoModelState, selectStep, downloadZipUri}: Props) => {
    if (repoModelState instanceof RepoModel) {
        return (
            <Row>
                <Col xs={3}>
                    <StepList
                        steps={repoModelState.steps}
                        selectedStep={repoModelState.selectedStep}
                        selectStep={selectStep}
                        downloadZipUri={downloadZipUri}
                    />
                </Col>
                <Col xs={9}>
                    <Panel>
                        <Readme readme={repoModelState.selectedStep.readme}/>
                    </Panel>
                </Col>
            </Row>
        );
    } else if (repoModelState instanceof LoadingInProgress) {
        return <Alert bsStyle="info">Loading...</Alert>;
    } else if (repoModelState instanceof Error) {
        return <Alert bsStyle="danger">{repoModelState.message}</Alert>;
    } else {
        return <div/>;
    }
};

export default Repo;