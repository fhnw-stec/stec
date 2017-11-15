import * as React from 'react';
import { GitHubConfigState, StecRootState, Step } from '../types';
import { Col, Grid, Panel, Row } from 'react-bootstrap';
import GitHubConfig from './GitHubConfig';
import Repo from './Repo';
import * as JSZip from 'jszip';

export interface Props {
    readonly state: StecRootState;
    readonly selectStep: (step: Step) => void;
    readonly updateGitHubConfig: (gitHubConfig: GitHubConfigState) => void;
    readonly reload: () => void;
    readonly downloadZipUri: (step: Step) => string;
    readonly fetchAllAsZip: (steps: Step[]) => Promise<JSZip>;
}

const App = (p: Props) => {
    return (
        <div className="container">
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <GitHubConfig
                                gitHubConfig={p.state.gitHubConfig}
                                updateGitHubConfig={p.updateGitHubConfig}
                                reload={p.reload}
                            />
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Repo
                            gitHubConfig={p.state.gitHubConfig}
                            repoState={p.state.repoState}
                            selectStep={p.selectStep}
                            downloadZipUri={p.downloadZipUri}
                            fetchAllAsZip={p.fetchAllAsZip}
                            blobBaseUrl={`https://github.com/${p.state.gitHubConfig.gitHubUser}/${p.state.gitHubConfig.gitHubRepo}/blob`}
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default App;