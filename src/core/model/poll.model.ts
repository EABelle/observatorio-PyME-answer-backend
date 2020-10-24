import {QuestionType, Status} from '../domain/Poll';

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

const pollSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    },
    company: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
        name: String,
    },
    name: String,
    description: String,
    status: {
        type: String,
        enum : [Status.COMPLETE, Status.IN_PROGRESS, Status.NOT_STARTED],
        default: Status.NOT_STARTED
    },
    created: String,
    modified: String,
    sections: [sectionSchema],
});

export const PollModel = mongoose.model('Poll', pollSchema);
