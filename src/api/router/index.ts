import {Router} from 'express';
import {UserController} from '../controller/user.controller';
import {PollController} from '../controller/poll.controller';
import {TemplateController} from '../controller/template.controller';
import {param, body} from 'express-validator';

const validations = {
    user: {
        post: [body('name').exists()]
    },
    poll: {
        get: [param('id').exists()],
        post: [],
        put: [param('id').exists(), body('userId').exists()],
        delete: [param('id').exists()]
    },
    template: {
        get: [],
        delete: [param('id').exists()]
    }
};

export const userRouter: Router = Router()
    .post('/', validations.user.post, UserController.createUser);

export const pollRouter: Router = Router()
    .get('/:id', validations.poll.get, PollController.getPoll)
    .post('/', validations.poll.post, PollController.createPoll)
    .put('/:id', validations.poll.put, PollController.editPoll)
    .delete('/:id', validations.poll.delete, PollController.deletePoll);

export const templateRouter: Router = Router()
    .get('/', TemplateController.getTemplates)
    .get('/:id', validations.template.get, TemplateController.getTemplate)
    .post('/', validations.poll.post, TemplateController.createTemplate)
    .delete('/:id', validations.template.delete, TemplateController.deleteTemplate);

export const externalRouter: Router = Router()
    .get('/:id', validations.poll.get, PollController.getPoll);
