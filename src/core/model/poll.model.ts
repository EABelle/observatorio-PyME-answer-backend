import { Status} from '../domain/Poll';
import {templatePreSchema} from './template.model';

const mongoose = require('mongoose');

const {externalId: _templateExternalId, ...pollPreSchema} = templatePreSchema;

const pollSchema = new mongoose.Schema({
    company: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
        name: String,
    },
    status: {
        type: String,
        enum : [Status.COMPLETE, Status.IN_PROGRESS, Status.NOT_STARTED],
        default: Status.NOT_STARTED
    },
    templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
    },
    modified: { type: Date },
    ...pollPreSchema,
});

export const PollModel = mongoose.model('Poll', pollSchema);
