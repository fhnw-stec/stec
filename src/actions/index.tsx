import {StecService, Tag} from '../types/index';
import {Dispatch} from 'react-redux';

export interface StecAction {
    readonly type: string;
}

export const FETCH_TAGS_IN_PROGRESS = 'FETCH_TAGS_IN_PROGRESS';
export type FETCH_TAGS_IN_PROGRESS = typeof FETCH_TAGS_IN_PROGRESS;

export interface FetchTagsInProgressAction extends StecAction {
    readonly type: FETCH_TAGS_IN_PROGRESS;
}

export function fetchTagsInProgress(): FetchTagsInProgressAction {
    return {
        type: FETCH_TAGS_IN_PROGRESS
    };
}

export const RECEIVE_TAGS_SUCCESS = 'RECEIVE_TAGS_SUCCESS';
export type RECEIVE_TAGS_SUCCESS = typeof RECEIVE_TAGS_SUCCESS;

export interface ReceiveTagsSuccessAction extends StecAction {
    readonly type: RECEIVE_TAGS_SUCCESS;
    readonly tags: Tag[];
}

export function receiveTagsSuccess(tags: Tag[]): ReceiveTagsSuccessAction {
    return {
        type: RECEIVE_TAGS_SUCCESS,
        tags
    };
}

export const RECEIVE_TAGS_ERROR = 'RECEIVE_TAGS_ERROR';
export type RECEIVE_TAGS_ERROR = typeof RECEIVE_TAGS_ERROR;

export interface ReceiveTagsErrorAction extends StecAction {
    readonly type: RECEIVE_TAGS_ERROR;
    readonly error: string;
}

export function receiveTagsError(error: string): ReceiveTagsErrorAction {
    return {
        type: RECEIVE_TAGS_ERROR,
        error
    };
}

export function loadSteps(service: StecService) {
    return (dispatch: Dispatch<StecAction>) => {
        dispatch(fetchTagsInProgress());
        return service.fetchTags()
            .then(
                tags => dispatch(receiveTagsSuccess(tags)),
                error => dispatch(receiveTagsError(error))
            );
    };
}
