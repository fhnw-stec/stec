import {GitHubRepo, GitHubUser, StecRootState, Step} from '../types/index';
import {connect} from 'react-redux';
import App from '../components/App';
import {Dispatch} from 'redux';
import * as actions from '../actions/';
import {GitHubService} from '../api/GitHubService';

interface StateProps {
    state: StecRootState;
}

const mapStateToProps = (state: StecRootState): StateProps => {
    return {state};
};

interface DispatchProps {
    dispatch: Dispatch<actions.StecAction>;
}

const mapDispatchToProps = (dispatch: Dispatch<actions.StecAction>): DispatchProps => {
    return {dispatch};
};

// mapDispatchToProps cannot access state -> mergeProps allows to mix and match
const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => {
    const service = new GitHubService(stateProps.state.gitHubUser, stateProps.state.gitHubRepo);
    return {
        ...stateProps,
        loadSteps: () => {
            dispatchProps.dispatch(actions.loadSteps(service));
        },
        selectStep: (step: Step) => dispatchProps.dispatch(actions.updateSelectedStep(step)),
        getDownloadZipUri: (step: Step) => {
            return service.getDownloadZipUri(step.tag.name);
        },
        updateGitHubConfig: (gitHubUser: GitHubUser, gitHubRepo: GitHubRepo) =>
            // poor man's action chaining with `then`
            // a proper effect/cmd system a la Elm would be cleaner
            // but redux-loop doesn't look mature enough...
            dispatchProps.dispatch(actions.updateGitHubConfig(gitHubUser, gitHubRepo))
                .then(newState => {
                    const updatedService = new GitHubService(newState.gitHubUser, newState.gitHubRepo);
                    dispatchProps.dispatch(actions.loadSteps(updatedService));
                })
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);