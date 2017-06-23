import {LoadingInProgress, RepoModel, StecRootState} from '../types/index';
import {
    LOADING_IN_PROGRESS,
    ERROR,
    UPDATE_STEPS,
    ErrorAction,
    UpdateSteps,
    StecAction
} from '../actions/index';

export function rootReducer(state: StecRootState, action: StecAction): StecRootState {

    switch (action.type) {
        case LOADING_IN_PROGRESS:
            return {
                ...state,
                repoState: new LoadingInProgress()
            };
        case UPDATE_STEPS:
            const steps = (action as UpdateSteps).steps;
            return {
                ...state,
                repoState: new RepoModel(steps)
            };
        case ERROR:
            return {
                ...state,
                repoState: new Error((action as ErrorAction).error)
            };

        default:
            return state;
    }

}