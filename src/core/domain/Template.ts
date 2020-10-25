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

export interface Template {
    _id?: string;
    externalId: string;
    name: string;
    description: string;
    created: string;
    modified: string;
    sections: Section[];
}
