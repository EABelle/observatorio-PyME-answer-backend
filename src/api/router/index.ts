import {Router} from 'express';
import {UserController} from '../controller/user.controller';
import {PollController} from '../controller/poll.controller';
import {TemplateController} from '../controller/template.controller';
import {param, body} from 'express-validator';
import authMiddleware from '../../core/middlewares/auth';
import permissions from './permissions';

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
    .post('/', authMiddleware(permissions.user.CREATE), validations.user.post, UserController.createUser);

export const pollRouter: Router = Router()
    .get('/:id', authMiddleware(permissions.poll.READ), validations.poll.get, PollController.getPoll)
    .post('/', authMiddleware(permissions.poll.CREATE), validations.poll.post, PollController.createPoll)
    .put('/:id', authMiddleware(permissions.poll.UPDATE), validations.poll.put, PollController.editPoll)
    .delete('/:id', authMiddleware(permissions.poll.DELETE), validations.poll.delete, PollController.deletePoll);

export const templateRouter: Router = Router()
    .get('/', authMiddleware(permissions.template.READ), TemplateController.getTemplates)
    .get('/:id', authMiddleware(permissions.template.READ), validations.template.get, TemplateController.getTemplate)
    .post('/', authMiddleware(permissions.template.CREATE), validations.poll.post, TemplateController.createTemplate)
    .delete('/:id', authMiddleware(permissions.template.DELETE), validations.template.delete, TemplateController.deleteTemplate);

export const externalRouter: Router = Router()
    .get('/:id', validations.poll.get, PollController.getPoll);
