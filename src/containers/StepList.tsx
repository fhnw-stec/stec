import StepList from '../components/StepList';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps(state: StoreState) {
    return state;
}

export function mapDispatchToProps(dispatch: Dispatch<actions.LoadTagsAction>) {
    return {
        loadTags: () => dispatch(actions.loadTags())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepList);