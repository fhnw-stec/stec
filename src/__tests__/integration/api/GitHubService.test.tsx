import { GitHubService } from '../../../api/GitHubService';

const service = new GitHubService({gitHubUser: 'fhnw-stec', gitHubRepo: 'stec-mock'});

describe('GitHub service', () => {

    it('should fetch tags', async () => {
        expect.assertions(1);
        const tags = await service.fetchTags();
        expect(tags).toMatchObject([{ref: 'refs/tags/step-1'}, {ref: 'refs/tags/step-2'}]);
    });

    it('should fetch README as HTML', async () => {
        expect.assertions(1);
        const readme = await service.fetchReadmeAsHtml('step-1');
        expect(readme).toContain('<p>Welcome!</p>');
    });

});