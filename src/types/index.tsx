export type Tag = string

export interface Step {
    readonly tag: Tag,
    readonly description: string
}

export interface StoreState {
    steps: Array<Step>
}

