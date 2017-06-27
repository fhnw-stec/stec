import {GitHubService} from './GitHubService';

const service = new GitHubService({gitHubUser: 'fhnw-stec', gitHubRepo: 'stec-mock'});

describe('GitHub service', () => {

    it('should fetch tags', async () => {
        expect.assertions(1);
        const tags = await service.fetchTags();
        expect(tags).toMatchObject([{name: 'step-2'}, {name: 'step-1'}]);
    });

    it('should fetch README as HTML', async () => {
        expect.assertions(1);
        const readme = await service.fetchReadmeAsHtml('step-1');
        expect(readme).toContain('<p>Welcome!</p>');
    });

});