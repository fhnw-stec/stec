import { AnnotatedTag, Ref, SHA, StecService, Tag, Tree } from '../../types';
        return Promise.resolve(require(`./mock-reponses/git-refs-tags-${this.shortSha(sha)}.json`));
    fetchTree(sha: SHA): Promise<Tree> {
        return Promise.resolve(require(`./mock-reponses/git-trees-${this.shortSha(sha)}.json`));
    }

    private shortSha(sha: SHA) {
        return sha.substring(0, 6);