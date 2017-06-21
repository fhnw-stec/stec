export type Repo = string;

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