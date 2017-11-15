import * as React from 'react';
import { GitHubConfigState, LoadingInProgress, RepoModel, RepoState, Step } from '../types';
import { Alert, Col, Panel, Row } from 'react-bootstrap';
import StepList from './StepList';
import Readme from './Readme';
import FileList from './FileList';
import * as JSZip from 'jszip';

export interface Props {
    readonly gitHubConfig: GitHubConfigState;
    readonly repoState: RepoState;
    readonly selectStep: (step: Step) => void;
    readonly downloadZipUri: (step: Step) => string;
    readonly fetchAllAsZip: (steps: Step[]) => Promise<JSZip>;
    readonly blobBaseUrl: String;
}

const Repo = (p: Props) => {
    if (p.repoState instanceof RepoModel) {
        if (p.repoState.steps.length === 0) {
            return <Alert bsStyle="info">No annotated tags</Alert>;
        } else {
            return (
                <Row>
                    <Col xs={3}>
                        <StepList
                            gitHubConfig={p.gitHubConfig}
                            steps={p.repoState.steps}
                            selectedStep={p.repoState.selectedStep}
                            selectStep={p.selectStep}
                            downloadZipUri={p.downloadZipUri}
                            fetchAllAsZip={p.fetchAllAsZip}
                        />
                    </Col>
                    <Col xs={9}>
                        <Panel>
                            <Readme readme={p.repoState.selectedStep.readme}/>
                        </Panel>
                        <FileList fileBaseUrl={p.blobBaseUrl + '/' + p.repoState.selectedStep.tag} tree={p.repoState.selectedStep.tree}/>
                    </Col>
                </Row>
            );
        }
    } else if (p.repoState instanceof LoadingInProgress) {
        return <Alert bsStyle="info">Loading...</Alert>;
    } else if (p.repoState instanceof Error) {
        return <Alert bsStyle="danger">{p.repoState.message}</Alert>;
    } else {
        return <div/>;
    }
};

export default Repo;