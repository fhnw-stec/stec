import {GitHubConfigState, GitHubRepo, GitHubUser} from '../types/index';
import {Button, ControlLabel, Form, FormControl, FormGroup, Glyphicon} from 'react-bootstrap';
import * as React from 'react';

interface Props {
    readonly gitHubConfig: GitHubConfigState;
    readonly updateGitHubConfig: (gitHubConfig: GitHubConfigState) => void;
    readonly reload: () => void;
}

type State = GitHubConfigState;

export default class GitHubConfig extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = props.gitHubConfig;
    }

    componentWillMount() {
        this.props.reload();
    }

    componentWillReceiveProps(nextProps: Props) {
        if ((this.props.gitHubConfig !== nextProps.gitHubConfig)) {
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
    // noinspection UnterminatedStatementJS
    private readonly onSubmit = (e: { preventDefault: () => void }) => {

        // no actual form submission
        e.preventDefault();

        if ((this.state === this.props.gitHubConfig)) {
            this.props.reload();
        } else {
            this.props.updateGitHubConfig(this.state);
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