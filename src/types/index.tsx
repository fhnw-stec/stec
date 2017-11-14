export interface StecRootState {
    readonly gitHubConfig: GitHubConfigState;
    readonly repoState: RepoState;
}

export type GitHubUser = string;
export type GitHubRepo = string;

export interface GitHubConfigState {
    readonly gitHubUser: GitHubUser;
    readonly gitHubRepo: GitHubRepo;
}

export type RepoState = Empty | LoadingInProgress | Error | RepoModel;

export class RepoModel {
    constructor(readonly steps: Step[], readonly selectedStep: Step) {
        this.steps = steps;
        this.selectedStep = selectedStep;
    }
}

export class Empty {
}

export class LoadingInProgress {
}

export class Error {
    readonly error: string;
}

export interface Step {
    readonly tag: Ref;
    readonly title: string;
    readonly readme: string;
    readonly tree: Tree;
}

export interface Tree {
    readonly tree: TreeEntry[];
}

export const EMPTY_TREE: Tree = {
    tree: []
};

export const EMPTY_STEP: Step = {
    tag: '',
    title: '',
    readme: '',
    tree: EMPTY_TREE
};

export interface TreeEntry {
    readonly path: string;
    readonly mode: string;
    readonly sha: SHA;
}

export interface StecService {
    fetchTags(): Promise<Tag[]>;
    fetchAnnotatedTag(sha: SHA): Promise<AnnotatedTag>;
    fetchReadmeAsHtml(ref: Ref): Promise<string>;
    fetchTree(sha: SHA): Promise<Tree>;
    getDownloadZipUri(ref: Ref): string;
}

export interface Tag {
    readonly object: RefObject;
    readonly type: RefObjectType;
}

export interface AnnotatedTag {
    readonly tag: Ref;
    readonly object: {
        readonly sha: SHA
    };
    readonly message: string;
}

export type Ref = string;
export type SHA = string;

type RefObjectType = 'tag' | 'commit';

export interface RefObject {
    readonly sha: string;
    readonly url: string;
}