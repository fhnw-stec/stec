import StepList from '../components/StepList';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import {GitHubService} from '../api/GitHubService';

const service = new GitHubService('fhnw-stec', 'stec-mock');

const mapStateToProps = (state: StoreState) => {
    return state;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.StecAction>) => {
    return {
        loadSteps: () => dispatch(actions.loadSteps(service))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepList);