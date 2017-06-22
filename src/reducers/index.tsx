import {LoadingInProgress, RepoModel, StecRootState, Step, Tag} from '../types/index';
import {
    FETCH_TAGS_IN_PROGRESS,
    RECEIVE_TAGS_ERROR,
    RECEIVE_TAGS_SUCCESS,
    ReceiveTagsErrorAction,
    ReceiveTagsSuccessAction,
    StecAction
} from '../actions/index';

// TODO: Break into individual reducers
export function rootReducer(state: StecRootState, action: StecAction): StecRootState {

    switch (action.type) {
        case FETCH_TAGS_IN_PROGRESS:
            return {
                ...state,
                repoState: new LoadingInProgress()
            };
        case RECEIVE_TAGS_SUCCESS:

            const tags = (action as ReceiveTagsSuccessAction).tags;
            const steps = tags.map(createStep);

            return {
                ...state,
                repoState: new RepoModel(steps)
            };
        case RECEIVE_TAGS_ERROR:
            return {
                ...state,
                repoState: new Error((action as ReceiveTagsErrorAction).error)
            };

        default:
            return state;
    }

    function createStep(tag: Tag): Step {
        return {
            tag,
            description: tag.name // TODO: Parse header from README
        };
    }

}