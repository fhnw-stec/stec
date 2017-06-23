import {StecService, Step} from '../types/index';
import {Dispatch} from 'react-redux';

export interface StecAction {
    readonly type: string;
}

export const LOADING_IN_PROGRESS = 'LOADING_IN_PROGRESS';
export type LOADING_IN_PROGRESS = typeof LOADING_IN_PROGRESS;

export interface LoadingInProgressAction extends StecAction {
    readonly type: LOADING_IN_PROGRESS;
}

export function loadingProgress(): LoadingInProgressAction {
    return {
        type: LOADING_IN_PROGRESS
    };
}

export const UPDATE_STEPS = 'UPDATE_STEPS';
export type UPDATE_STEPS = typeof UPDATE_STEPS;

export interface UpdateSteps extends StecAction {
    readonly type: UPDATE_STEPS;
    readonly steps: Step[];
}

export function updateSteps(steps: Step[]): UpdateSteps {
    return {
        type: UPDATE_STEPS,
        steps
    };
}

export const ERROR = 'ERROR';
export type ERROR = typeof ERROR;

export interface ErrorAction extends StecAction {
    readonly type: ERROR;
    readonly error: string;
}

export function error(error: string): ErrorAction {
    return {
        type: ERROR,
        error
    };
}

export function loadSteps(service: StecService) {
    return async (dispatch: Dispatch<StecAction>) => {
        try {
            dispatch(loadingProgress());
            const tags = await service.fetchTags();
            const steps = await Promise.all(tags.map(async tag => {
                const readme = await service.fetchReadmeAsHtml(tag.name);
                return {
                    tag,
                    title: tag.name, // TODO: Extract title from README
                    readme
                };
            }));
            dispatch(updateSteps(steps));
        } catch (e) {
            dispatch(error(e));
        }
    };
}
