export interface UserPayload {
    avatar: string;
    name: string;
}

export interface UserResponse {
    id: string;
    avatar: string;
    name: string;
}

export interface ArticlePayload {
    userId: string;
    text?: string;
    title?: string;
    tags?: string[];
}

export interface ArticleResponse {
    id: string;
    text: string;
    title: string;
    tags: string[];
    userId: string;
}
