import {GitHubRepo, GitHubUser} from '../types/index';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import * as React from 'react';

interface Props {
    readonly gitHubUser: GitHubUser;
    readonly gitHubRepo: GitHubRepo;
    readonly updateGitHubConfig: (gitHubUser: GitHubUser, gitHubRepo: GitHubRepo) => void;
    readonly refresh: () => void;
}

interface State {
    readonly gitHubUser: GitHubUser;
    readonly gitHubRepo: GitHubRepo;
}

export default class GitHubConfig extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            gitHubUser: props.gitHubUser,
            gitHubRepo: props.gitHubRepo
        };
    }

    public render() {
        return (
            <Form inline={true}>
                <FormGroup>
                    <ControlLabel>GitHub User</ControlLabel>
                    {' '} {/* Wow, this horizontal spacing is hacky – but according to docs */}
                    <FormControl
                        type="text"
                        value={this.state.gitHubUser}
                        onChange={/* tslint:disable */e => this.handleGitHubUserChanged((e as any).target.value)/* tslint:enable */}
                    />
                    {' '}
                    <ControlLabel>GitHub Repository</ControlLabel>
                    {' '}
                    <FormControl
                        type="text"
                        value={this.state.gitHubRepo}
                        onChange={/* tslint:disable */e => this.handleGitHubRepoChanged((e as any).target.value)/* tslint:enable */}
                    />
                    {' '}
                    <Button
                        onClick={e => this.props.updateGitHubConfig(this.state.gitHubUser, this.state.gitHubRepo)}
                    >
                        Refresh
                    </Button>
                </FormGroup>
            </Form>);
    }

    private handleGitHubUserChanged(gitHubUser: GitHubUser) {
        this.setState({
            ...this.state,
            gitHubUser
        });
    }

    private handleGitHubRepoChanged(gitHubRepo: GitHubRepo) {
        this.setState({
            ...this.state,
            gitHubRepo
        });
    }

}