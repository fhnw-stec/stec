export interface StecRootState {
    readonly gitHubUser: GitHubUser;
    readonly gitHubRepo: GitHubRepo;
    readonly repoState: RepoState;
}

export type GitHubUser = string;
export type GitHubRepo = string;

export type RepoState = Empty | LoadingInProgress | Error | RepoModel;

export class RepoModel {
    readonly steps: Step[];
    constructor(steps: Step[]) {
        this.steps = steps;
    }
}

export class Empty {
}

export class LoadingInProgress {
    readonly description: string;
}

export class Error {
    readonly error: string;
}

export interface Step {
    readonly tag: Tag;
    readonly title: string;
    readonly readme: string;
}

export interface StecService {
    fetchTags(): Promise<Tag[]>;
    fetchReadmeAsHtml(ref: Ref): Promise<string>;
}

export type Ref = string;

export interface Tag {
    readonly name: Ref;
}