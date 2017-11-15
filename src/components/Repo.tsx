import * as React from 'react';
import { LoadingInProgress, RepoModel, RepoState, Step } from '../types';
import { Alert, Col, Panel, Row } from 'react-bootstrap';
import StepList from './StepList';
import Readme from './Readme';
import FileList from './FileList';

export interface Props {
    readonly repoState: RepoState;
    readonly selectStep: (step: Step) => void;
    readonly downloadZipUri: (step: Step) => string;
    readonly blobBaseUrl: String;
}

const Repo = ({repoState, selectStep, downloadZipUri, blobBaseUrl}: Props) => {
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
                        <FileList fileBaseUrl={blobBaseUrl + '/' + repoState.selectedStep.tag} tree={repoState.selectedStep.tree}/>
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