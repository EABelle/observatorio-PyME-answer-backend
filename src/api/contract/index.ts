export interface UserPayload {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    password?: string;
    roles?: string[];
    company?: {
        id: string;
        name: string;
    };
    confirmed?: boolean;
}

export interface UserResponse {
    id: string;
    avatar: string;
    name: string;
    email: string;
    roles: string[];
    company?: {
        id: string;
        name: string;
    };
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
    type: QuestionType;
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

export interface CompanyPayload {
    id?: string;
    name: string;
}

export interface PollPayload {
    company?: CompanyPayload;
    created?: string;
    name: string;
    description: string;
    status: Status;
    sections: Section[];
    userId: string;
    templateId: string;
}

export interface TemplatePayload {
    id?: string;
    modified?: string;
    created: string;
    name: string;
    description: string;
    sections: Section[];
}

export interface PollResponse {
    id: string;
    user?: UserResponse;
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
    templateId: string;
}

export interface TemplateResponse {
    id?: string;
    externalId?: string;
    modified?: string;
    name: string;
    description: string;
    created: string;
    sections: Section[];
    sentCount: number;
}


export interface RolePayload {
    id?: string;
    name: string;
    permissions: string[];
}

export interface RoleResponse extends RolePayload {
    id: string;
}
