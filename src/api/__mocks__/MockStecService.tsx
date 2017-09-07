import { AnnotatedTag, Ref, SHA, StecService, Tag } from '../../types/index';

export class MockStecService implements StecService {

    fetchTags(): Promise<Tag[]> {
        return Promise.resolve(require('./mock-reponses/git-refs-tags.json'));
    }

    fetchAnnotatedTag(sha: SHA): Promise<AnnotatedTag> {
        const shortSha = sha.substring(sha.length - 6, sha.length);
        return Promise.resolve(require(`./mock-reponses/git-refs-tags-${shortSha}.json`));
    }

    fetchReadmeAsHtml(ref: Ref): Promise<string> {
        return Promise.resolve(`Mock README ${ref}`);
    }

    getDownloadZipUri(ref: Ref): string {
        return `http://example.com/${ref}.zip`;
    }

    fetchDiff(sha: SHA): Promise<string> {
        return Promise.resolve(`diff --git a/README.adoc b/README.adoc \n new file mode 100644 \n index 0000000..9c2d38b \n \ 
        --- /dev/null \n +++ b/README.adoc \n @@ -0,0 +1,3 @@ \n +## Intro \n  + \n +Welcome!`);
    }

}