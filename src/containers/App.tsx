import {StecRootState, Step} from '../types/index';
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
        loadSteps: () => dispatchProps.dispatch(actions.loadSteps(service)),
        selectStep: (step: Step) => dispatchProps.dispatch(actions.updateSelectedStep(step)),
        getDownloadZipUri: (step: Step) => service.getDownloadZipUri(step.tag.name)
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);