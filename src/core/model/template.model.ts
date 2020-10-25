import {QuestionType} from '../domain/Poll';

const mongoose = require('mongoose');

const restrictionsSchema = new mongoose.Schema({
    min: Number,
    max: Number,
});

const basicQuestionPreSchema = {
    type: {
        type: String,
        enum : [
            QuestionType.TEXT,
            QuestionType.NUMBER,
            QuestionType.SELECT,
            QuestionType.CHOICE,
            QuestionType.FILE,
            QuestionType.GROUPED,
        ],
        default: QuestionType.TEXT
    },
    title: String,
    value: mongoose.Schema.Types.Mixed,
    mandatory: String,
    options: [String],
    description: String,
    multiline: Boolean,
    restrictions: restrictionsSchema,
};

const questionSchema = new mongoose.Schema({
    ...basicQuestionPreSchema,
    questions: [new mongoose.Schema(basicQuestionPreSchema)],
});

const sectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    questions: [questionSchema],
});

export const templatePreSchema = {
    name: String,
    description: String,
    created: String,
    modified: String,
    sections: [sectionSchema],
};

const templateSchema = new mongoose.Schema(templatePreSchema);

export const TemplateModel = mongoose.model('Template', templateSchema);
