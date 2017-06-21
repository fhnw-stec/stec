import {Step, StoreState, Tag} from '../types/index';
import {
    RECEIVE_TAGS_ERROR,
    RECEIVE_TAGS_SUCCESS, ReceiveTagsErrorAction,
    ReceiveTagsSuccessAction,
    REQUEST_TAGS,
    StecAction
} from '../actions/index';

// TODO: Break into individual reducers
export function rootReducer(state: StoreState, action: StecAction): StoreState {

    switch (action.type) {
        case REQUEST_TAGS:
            return {
                ...state,
                steps: []
            };
        case RECEIVE_TAGS_SUCCESS:

            const tags = (action as ReceiveTagsSuccessAction).tags;
            const steps = tags.map(createStep);

            return {
                ...state,
                steps
            };
        case RECEIVE_TAGS_ERROR:
            // TODO: Add errors to state and render in UI
            console.log((action as ReceiveTagsErrorAction).error);
            return state;

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