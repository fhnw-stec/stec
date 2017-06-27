import {
    UPDATE_GITHUB_CONFIG, UPDATE_SELECTED_STEP, UPDATE_STEPS, updateGitHubConfig, updateSelectedStep,
    updateSteps
} from '../actions/index';
import {reducer} from './index';
import {Empty, EMPTY_STEP, RepoModel, Step} from '../types/index';

describe('reducer', () => {

    const dummyStepA: Step = {
        tag: {
            name: 'dummyTag'
        },
        title: 'dummyStepA',
        readme: 'README StepA'
    };

    const dummyStepB: Step = {
        tag: {
            name: 'dummyTag'
        },
        title: 'dummyStepB',
        readme: 'README StepB'
    };

    const initialGitHubConfig = {
        gitHubUser: 'foo',
        gitHubRepo: 'bar'
    };

    const initialState = {
        gitHubConfig: initialGitHubConfig,
        repoState: new RepoModel([dummyStepA, dummyStepB], dummyStepA)
    };

    it(`should handle ${UPDATE_GITHUB_CONFIG}`, () => {

        const payload = {
            gitHubUser: 'new-user',
            gitHubRepo: 'new-repo'
        };

        expect(
            reducer(initialState, updateGitHubConfig(payload))
        ).toEqual({
            gitHubConfig: payload,
            repoState: new Empty()
        });

    });

    it(`should handle ${UPDATE_STEPS} with empty list of steps`, () => {
        expect(
            reducer(initialState, updateSteps([]))
        ).toEqual({
            gitHubConfig: initialGitHubConfig,
            repoState: new RepoModel([], EMPTY_STEP)
        });
    });

    it(`should handle ${UPDATE_STEPS} with non-empty list of steps`, () => {
        expect(
            reducer(initialState, updateSteps([dummyStepB, dummyStepA]))
        ).toEqual({
            gitHubConfig: initialGitHubConfig,
            repoState: new RepoModel([dummyStepB, dummyStepA], dummyStepB)
        });
    });

    it(`should handle ${UPDATE_SELECTED_STEP}}`, () => {
        expect(
            reducer(initialState, updateSelectedStep(dummyStepB))
        ).toEqual({
            gitHubConfig: initialGitHubConfig,
            repoState: new RepoModel([dummyStepA, dummyStepB], dummyStepB)
        });
    });

});