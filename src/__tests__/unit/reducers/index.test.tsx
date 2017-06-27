import {
    UPDATE_GITHUB_CONFIG,
    UPDATE_SELECTED_STEP,
    UPDATE_STEPS,
    updateGitHubConfig,
    updateSelectedStep,
    updateSteps
} from '../../../actions/index';
import {reducer} from '../../../reducers/index';
import {Empty, EMPTY_STEP, LoadingInProgress, RepoModel, Step} from '../../../types/index';

describe('reducer', () => {

        const dummyStep = (s: string): Step => {
            return {
                tag: `tag-${s}`,
                title: `title-${s}`,
                readme: `readme-${s}`
            };
        };

        const dummyStepA = dummyStep('A');
        const dummyStepA2 = dummyStep('A2');
        const dummyStepA11 = dummyStep('A11');

        const dummyStepB = dummyStep('B');
        const dummyStepC = dummyStep('C');

        const initialGitHubConfig = {
            gitHubUser: '',
            gitHubRepo: ''
        };

        const initialState = {
            gitHubConfig: initialGitHubConfig,
            repoState: new Empty()
        };

        it(`should handle ${UPDATE_GITHUB_CONFIG}`, () => {

            const payload = {
                gitHubUser: 'new-user',
                gitHubRepo: 'new-repo'
            };

            // start with non-empty repo state to assert reset to empty
            const state = {
                ...initialState,
                repoState: new LoadingInProgress()
            };

            expect(
                reducer(state, updateGitHubConfig(payload))
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
                reducer(initialState, updateSteps([dummyStepA, dummyStepB]))
            ).toEqual({
                gitHubConfig: initialGitHubConfig,
                repoState: new RepoModel([dummyStepA, dummyStepB], dummyStepA)
            });
        });

        it(`should handle ${UPDATE_STEPS} with unsorted list of steps`, () => {
            expect(
                reducer(initialState, updateSteps([dummyStepA11, dummyStepA2]))
            ).toEqual({
                gitHubConfig: initialGitHubConfig,
                repoState: new RepoModel([dummyStepA2, dummyStepA11], dummyStepA2)
            });
        });

        it(`should handle ${UPDATE_SELECTED_STEP}}`, () => {
            const state = reducer(initialState, updateSteps([dummyStepC, dummyStepB]));
            expect(
                reducer(state, updateSelectedStep(dummyStepC))
            ).toEqual({
                gitHubConfig: initialGitHubConfig,
                repoState: new RepoModel([dummyStepB, dummyStepC], dummyStepC)
            });
        });

    }
);