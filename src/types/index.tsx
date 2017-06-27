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
    readonly tag: Tag;
    readonly title: string;
    readonly readme: string;
}

export const EMPTY_STEP: Step = {
    tag: {name: ''},
    title: '',
    readme: ''
};

export interface StecService {
    fetchTags(): Promise<Tag[]>;
    fetchReadmeAsHtml(ref: Ref): Promise<string>;
    getDownloadZipUri(ref: Ref): string;
}

export type Ref = string;

export interface Tag {
    readonly name: Ref;
}