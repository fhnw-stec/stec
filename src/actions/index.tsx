import * as constants from '../constants';

export interface LoadTagsAction {
    type: constants.LOAD_TAGS;
}

export function loadTags(): LoadTagsAction {
    return {
        type: constants.LOAD_TAGS
    };
}