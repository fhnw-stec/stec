import StepList from '../components/StepList';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

const mapStateToProps = (state: StoreState) => {
    return state;
};

const mapDispatchToProps = (dispatch: Dispatch<actions.StecAction>) => {
    return {
        loadSteps: () => dispatch(actions.loadSteps('https://api.github.com/repos/fhnw-stec/stec-mock'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepList);