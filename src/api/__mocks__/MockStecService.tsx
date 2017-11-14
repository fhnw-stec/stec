import { AnnotatedTag, Ref, SHA, StecService, Tag, Tree } from '../../types';

export class MockStecService implements StecService {

    fetchTags(): Promise<Tag[]> {
        return Promise.resolve(require('./mock-reponses/git-refs-tags.json'));
    }

    fetchAnnotatedTag(sha: SHA): Promise<AnnotatedTag> {
        return Promise.resolve(require(`./mock-reponses/git-refs-tags-${this.shortSha(sha)}.json`));
    }

    fetchReadmeAsHtml(ref: Ref): Promise<string> {
        return Promise.resolve(`Mock README ${ref}`);
    }

    fetchTree(sha: SHA): Promise<Tree> {
        return Promise.resolve(require(`./mock-reponses/git-trees-${this.shortSha(sha)}.json`));
    }

    getDownloadZipUri(ref: Ref): string {
        return `http://example.com/${ref}.zip`;
    }

    private shortSha(sha: SHA) {
        return sha.substring(0, 6);
    }

}