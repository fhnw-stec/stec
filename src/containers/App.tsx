import {GitHubConfigState, StecRootState, Step} from '../types/index';
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
    const service = new GitHubService(stateProps.state.gitHubConfig);
    // noinspection JSUnusedGlobalSymbols
    return {
        ...stateProps,
        selectStep: (step: Step) => dispatchProps.dispatch(actions.updateSelectedStep(step)),
        updateGitHubConfig: (gitHubConfig: GitHubConfigState) =>
            dispatchProps.dispatch(actions.updateGitHubConfig(gitHubConfig)),
        reload: () => dispatchProps.dispatch(actions.loadSteps(service)),
        downloadZipUri: (step: Step) => {
            return service.getDownloadZipUri(step.tag);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);