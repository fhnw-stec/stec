import {Repo, Tag} from '../types/index';
import {Dispatch} from 'react-redux';

export interface StecAction {
    type: string;
}

export const REQUEST_TAGS = 'REQUEST_TAGS';
export type REQUEST_TAGS = typeof REQUEST_TAGS;

export interface RequestTagsAction extends StecAction {
    type: REQUEST_TAGS;
}

export function requestTags(): RequestTagsAction {
    return {
        type: REQUEST_TAGS
    };
}

export const RECEIVE_TAGS_SUCCESS = 'RECEIVE_TAGS_SUCCESS';
export type RECEIVE_TAGS_SUCCESS = typeof RECEIVE_TAGS_SUCCESS;

export interface ReceiveTagsSuccessAction extends StecAction {
    type: RECEIVE_TAGS_SUCCESS;
    tags: Tag[];
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
    type: RECEIVE_TAGS_ERROR;
    error: string;
}

export function receiveTagsError(error: string): ReceiveTagsErrorAction {
    return {
        type: RECEIVE_TAGS_ERROR,
        error
    };
}

export function loadSteps(repo: Repo) {
    // TODO: Move API call to service
    return (dispatch: Dispatch<StecAction>) => {
        dispatch(requestTags());
        const url = `${repo}/git/refs/tags`;
        return fetch(url)
            .then(
                response => {
                    if (response.ok) {
                        response.json().then((json: Object[]) => {
                            // TODO: Proper JSON deserialization
                            const tags = json.map((o: Object) => {
                                const ref = o['ref'];
                                return ref.substr(ref.lastIndexOf('/') + 1);
                            });
                            dispatch(receiveTagsSuccess(tags));
                        });
                    } else {
                        dispatch(receiveTagsError(response.statusText + ` (${url})`));
                    }
                },
                error => dispatch(receiveTagsError(error))
            );
    };
}
