import {GitHubRepo, GitHubUser} from '../types/index';
import {Button, ControlLabel, Form, FormControl, FormGroup, Glyphicon} from 'react-bootstrap';
import * as React from 'react';

interface Props {
    readonly gitHubUser: GitHubUser;
    readonly gitHubRepo: GitHubRepo;
    readonly updateGitHubConfig: (gitHubUser: GitHubUser, gitHubRepo: GitHubRepo) => void;
    readonly reload: () => void;
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

    componentWillMount() {
        this.props.reload();
    }

    componentWillReceiveProps(nextProps: Props) {
        if ((this.props.gitHubUser !== nextProps.gitHubUser) ||
            (this.props.gitHubRepo !== nextProps.gitHubRepo)) {
            nextProps.reload();
        }
    }

    render() {
        return (
            <Form inline={true} onSubmit={this.onSubmit}>
                <FormGroup>
                    <ControlLabel>GitHub User</ControlLabel>
                    {' '} {/* Wow, this horizontal spacing is hacky – but according to docs */}
                    <FormControl
                        type="text"
                        value={this.state.gitHubUser}
                        onChange={/* tslint:disable */e => this.onGitHubUserChanged((e as any).target.value)/* tslint:enable */}
                    />
                    {' '}
                    <ControlLabel>GitHub Repository</ControlLabel>
                    {' '}
                    <FormControl
                        type="text"
                        value={this.state.gitHubRepo}
                        onChange={/* tslint:disable */e => this.onGitHubRepoChanged((e as any).target.value)/* tslint:enable */}
                    />
                    {' '}
                    <Button type={'submit'}>
                        <Glyphicon glyph="refresh"/>
                    </Button>
                </FormGroup>
            </Form>);
    }

    // instance property in order not to lose the "this" context
    private readonly onSubmit = (e: { preventDefault: () => void }) => {

        // no actual form submission
        e.preventDefault();

        if ((this.state.gitHubUser === this.props.gitHubUser) &&
            (this.state.gitHubRepo === this.props.gitHubRepo)) {
            this.props.reload();
        } else {
            this.props.updateGitHubConfig(this.state.gitHubUser, this.state.gitHubRepo);
        }
    }

    private onGitHubUserChanged(gitHubUser: GitHubUser) {
        this.setState({
            ...this.state,
            gitHubUser
        });
    }

    private onGitHubRepoChanged(gitHubRepo: GitHubRepo) {
        this.setState({
            ...this.state,
            gitHubRepo
        });
    }

}