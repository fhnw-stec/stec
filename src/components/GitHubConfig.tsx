import {GitHubRepo, GitHubUser} from '../types/index';
import {Button, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import * as React from 'react';

interface Props {
    readonly gitHubUser: GitHubUser;
    readonly gitHubRepo: GitHubRepo;
    readonly refresh: () => void;
}

const GitHubConfig = ({gitHubUser, gitHubRepo, refresh}: Props) => {
    return (
        <Form inline={true}>
            <FormGroup>
                <ControlLabel>GitHub User</ControlLabel>
                {' '} {/* Wow, this horizontal spacing is hacky – but according to docs */}
                <FormControl
                    type="text"
                    value={gitHubUser}
                    readOnly={true}
                />
                {' '}
                <ControlLabel>GitHub Repository</ControlLabel>
                {' '}
                <FormControl
                    type="text"
                    value={gitHubRepo}
                    readOnly={true}
                />
                {' '}
                <Button onClick={refresh}>Refresh</Button>
            </FormGroup>
        </Form>);
};

export default GitHubConfig;