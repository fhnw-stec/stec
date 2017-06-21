export type Ref = string;

export interface Tag {
    readonly name: string;
}

export interface Step {
    readonly tag: Tag;
    readonly description: string;
}

// TODO: Use sum type to handle loading and errors distinctively

export interface StoreState {
    steps: Step[];
}

export interface StecService {
    fetchTags(): Promise<Tag[]>;
    fetchReadmeAsHtml(ref: Ref): Promise<string>;
}