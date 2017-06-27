import {GitHubUser, StecService, Step, GitHubRepo} from '../types/index';
import {Dispatch} from 'react-redux';

export interface StecAction {
    readonly type: string;
}

export const LOADING_IN_PROGRESS = 'LOADING_IN_PROGRESS';
export type LOADING_IN_PROGRESS = typeof LOADING_IN_PROGRESS;

export interface LoadingInProgressAction extends StecAction {
    readonly type: LOADING_IN_PROGRESS;
}

export const loadingProgress = (): LoadingInProgressAction => {
    return {
        type: LOADING_IN_PROGRESS
    };
};

export const UPDATE_STEPS = 'UPDATE_STEPS';
export type UPDATE_STEPS = typeof UPDATE_STEPS;

export interface UpdateSteps extends StecAction {
    readonly type: UPDATE_STEPS;
    readonly steps: Step[];
}

export const updateSteps = (steps: Step[]): UpdateSteps => {
    return {
        type: UPDATE_STEPS,
        steps
    };
};

export const UPDATE_SELECTED_STEP = 'UPDATE_SELECTED_STEP';
export type UPDATE_SELECTED_STEP = typeof UPDATE_SELECTED_STEP;

export interface UpdateSelectedStep extends StecAction {
    readonly selectedStep: Step;
}

export const updateSelectedStep = (step: Step): UpdateSelectedStep => {
    return {
        type: UPDATE_SELECTED_STEP,
        selectedStep: step
    };
};

export const UPDATE_GITHUB_CONFIG = 'UPDATE_GITHUB_CONFIG';
export type UPDATE_GITHUB_CONFIG = typeof UPDATE_GITHUB_CONFIG;

export interface UpdateGitHubConfig extends StecAction {
    readonly gitHubUser: GitHubUser;
    readonly gitHubRepo: GitHubRepo;
}

export const updateGitHubConfig = (gitHubUser: GitHubUser, gitHubRepo: GitHubRepo) => {
    return {
        type: UPDATE_GITHUB_CONFIG,
        gitHubUser,
        gitHubRepo
    };
};

export const ERROR = 'ERROR';
export type ERROR = typeof ERROR;

export interface ErrorAction extends StecAction {
    readonly type: ERROR;
    readonly message: string;
}

export const error = (message: string): ErrorAction => {
    return {
        type: ERROR,
        message
    };
};

export const loadSteps = (service: StecService) => {
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
};