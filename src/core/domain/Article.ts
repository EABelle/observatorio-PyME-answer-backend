export interface Article {
    readonly _id: string;
    readonly text: string;
    readonly title: string;
    readonly tags: string[];
    readonly userId: string;
}
