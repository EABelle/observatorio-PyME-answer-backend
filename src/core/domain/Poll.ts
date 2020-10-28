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

export interface Poll {
    _id: string;
    userId: string;
    company: {
        _id: string;
        name: string;
    };
    name: string;
    description: string;
    status: Status;
    created: Date;
    modified: Date;
    sections: Section[];
}
