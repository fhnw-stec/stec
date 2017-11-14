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
                            mode: 'blob',
                            sha: '9c2d38bbdccebdb67add6f43a4ae8a5dba64f867'
                        }
                    ]
                }
            },
            {
                tag: 'step-2', title: 'Step Two', readme: 'Mock README step-2', tree: {
                    tree: [
                        {
                            path: '.gitignore',
                            mode: 'blob',
                            sha: '485dee64bcfb48793379b200a1afd14e85a8aaf4'
                        },
                        {
                            path: 'README.adoc',
                            mode: 'blob',
                            sha: '8ec793d0ff9c3fbe4566da0ba90db920bc6e68ff'
                        },
                        {
                            path: 'hello-world.txt',
                            mode: 'blob',
                            sha: '2d684f44857386fe986cd0f3b9676bbafeeea318'
                        }
                    ]
                }
            },
            {
                tag: 'step-3', title: 'Step Three', readme: 'Mock README step-3', tree: {
                    tree: [
                        {
                            path: '.gitignore',
                            mode: 'blob',
                            sha: '485dee64bcfb48793379b200a1afd14e85a8aaf4',
                        },
                        {
                            path: 'README.adoc',
                            mode: 'blob',
                            sha: 'd944c431f0b90a2ea24390b5cbeda9243fbca877',
                        },
                        {
                            path: 'example-dir/bli.txt',
                            mode: 'blob',
                            sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
                        },
                        {
                            path: 'example-dir/example-sub-dir/bla.txt',
                            mode: 'blob',
                            sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
                        },
                        {
                            path: 'hello-world.txt',
                            mode: 'blob',
                            sha: '2d684f44857386fe986cd0f3b9676bbafeeea318',
                        }
                    ]
                }
            }
        ]);
    });

});