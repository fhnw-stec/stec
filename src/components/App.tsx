import * as React from 'react';
import { GitHubConfigState, StecRootState, Step } from '../types';
import { Col, Grid, Panel, Row } from 'react-bootstrap';
import GitHubConfig from './GitHubConfig';
import Repo from './Repo';

export interface Props {
    readonly state: StecRootState;
    readonly selectStep: (step: Step) => void;
    readonly updateGitHubConfig: (gitHubConfig: GitHubConfigState) => void;
    readonly reload: () => void;
    readonly downloadZipUri: (step: Step) => string;
}

const App = ({state, selectStep, updateGitHubConfig, reload, downloadZipUri}: Props) => {
    return (
        <div className="container">
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <GitHubConfig
                                gitHubConfig={state.gitHubConfig}
                                updateGitHubConfig={updateGitHubConfig}
                                reload={reload}
                            />
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Repo
                            repoState={state.repoState}
                            selectStep={selectStep}
                            downloadZipUri={downloadZipUri}
                            blobBaseUrl={`https://github.com/${state.gitHubConfig.gitHubUser}/${state.gitHubConfig.gitHubRepo}/blob`}
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default App;