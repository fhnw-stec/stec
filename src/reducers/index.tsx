import {EMPTY_STEP, LoadingInProgress, RepoModel, StecRootState} from '../types/index';
import {
    ERROR,
    ErrorAction,
    LOADING_IN_PROGRESS,
    StecAction,
    UPDATE_SELECTED_STEP,
    UPDATE_STEPS,
    UpdateSelectedStep,
    UpdateSteps
} from '../actions/index';

export function rootReducer(state: StecRootState, action: StecAction): StecRootState {

    switch (action.type) {

        case LOADING_IN_PROGRESS:
            return {
                ...state,
                repoState: new LoadingInProgress()
            };

        case UPDATE_STEPS: {
            const steps = (action as UpdateSteps).steps;
            const selectedStep = steps.length === 0 ? EMPTY_STEP : steps[0];
            return {
                ...state,
                repoState: new RepoModel(steps, selectedStep)
            };
        }

        case UPDATE_SELECTED_STEP: {
            const selectedStep = (action as UpdateSelectedStep).selectedStep;
            const oldRepoModel = state.repoState as RepoModel;
            const newRepoModel = new RepoModel(oldRepoModel.steps, selectedStep);
            return {
                ...state,
                repoState: newRepoModel
            };
        }

        case ERROR:
            return {
                ...state,
                repoState: new Error((action as ErrorAction).error)
            };

        default:
            return state;
    }

}