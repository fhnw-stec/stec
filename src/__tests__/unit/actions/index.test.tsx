import { MockStecService } from '../../../api/__mocks__/MockStecService';
import { loadStepsImpl } from '../../../actions';

describe('actions', () => {

    const service = new MockStecService();

    it('should load steps', async () => {
        expect.assertions(1);
        const steps = await loadStepsImpl(service);
        expect(steps).toEqual([
            {
                tag: 'step-1', title: 'Step One', readme: 'Mock README step-1', tree: {
                    tree: [
                        {
                            path: 'README.adoc',
                            type: 'blob'
                        }
                    ]
                }
            },
            {
                tag: 'step-2', title: 'Step Two', readme: 'Mock README step-2', tree: {
                    tree: [
                        {
                            path: '.gitignore',
                            type: 'blob'
                        },
                        {
                            path: 'README.adoc',
                            type: 'blob'
                        },
                        {
                            path: 'hello-world.txt',
                            type: 'blob'
                        }
                    ]
                }
            },
            {
                tag: 'step-3', title: 'Step Three', readme: 'Mock README step-3', tree: {
                    tree: [
                        {
                            path: '.gitignore',
                            type: 'blob'
                        },
                        {
                            path: 'README.adoc',
                            type: 'blob'
                        },
                        {
                            path: 'example-dir/bli.txt',
                            type: 'blob'
                        },
                        {
                            path: 'example-dir/example-sub-dir/bla.txt',
                            type: 'blob'
                        },
                        {
                            path: 'hello-world.txt',
                            type: 'blob'
                        }
                    ]
                }
            }
        ]);
    });

});