export interface UserPayload {
    avatar: string;
    name: string;
}

export interface UserResponse {
    id: string;
    avatar: string;
    name: string;
}


export enum Status {
    COMPLETE = 'COMPLETE',
    IN_PROGRESS = 'IN_PROGRESS',
    NOT_STARTED = 'NOT_STARTED',
}

export enum QuestionType {
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    SELECT = 'SELECT',
    CHOICE = 'CHOICE',
    FILE = 'FILE',
    GROUPED = 'GROUPED',
}

export interface Restrictions {
    min: number;
    max: number;
}

export interface Question {
    type: string;
    title: string;
    value: any;
    mandatory: boolean;
    options: string[];
    description: string;
    multiline?: boolean;
    questions: Question[];
    restrictions: Restrictions;
}

export interface Section {
    title: string;
    description: string;
    questions: Question[];
}

export interface PollPayload {
    company?: {
        id: string;
        name: string;
    };
    created?: string;
    name: string;
    description: string;
    status: Status;
    sections: Section[];
}

export interface TemplatePayload {
    created?: string;
    name: string;
    description: string;
    sections: Section[];
}

export interface PollResponse {
    id: string;
    company?: {
        id: string;
        name: string;
    };
    name: string;
    description: string;
    status: Status;
    created: string;
    modified: string;
    sections: Section[];
}

export interface TemplateResponse {
    id: string;
    name: string;
    description: string;
    created: string;
    modified: string;
    sections: Section[];
}

export interface ExternalTemplateResponse {
    id: string;
    name: string;
    description: string;
    created: string;
    modified: string;
    sections: Section[];
}
