import {Router} from 'express';
import {UserController} from '../controller/UserController';
import {PollController} from '../controller/PollController';
import {TemplateController} from '../controller/TemplateController';
import {param, body} from 'express-validator';
import authMiddleware from '../../core/middlewares/auth';
import permissions from './permissions';
import {RoleController} from '../controller/RoleController';

const validations = {
    user: {
        post: [body('name').exists()],
        getMany: []
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
    },
};

export const userRouter: Router = Router()
    .get('/', validations.user.getMany, UserController.getUsers)
    .post('/', authMiddleware(permissions.user.CREATE), validations.user.post, UserController.createUser);

export const roleRouter: Router = Router()
    .get('/:id', RoleController.getRole)
    .get('/', RoleController.getRoles)
    .post('/', RoleController.createRole)
    .put('/:id', RoleController.updateRole)
    .delete('/:id', RoleController.deleteRole);

export const pollRouter: Router = Router()
    .get('/:id', authMiddleware(permissions.poll.READ), validations.poll.get, PollController.getPoll)
    .post('/', authMiddleware(permissions.poll.CREATE), validations.poll.post, PollController.createPoll)
    .put('/:id', authMiddleware(permissions.poll.UPDATE), validations.poll.put, PollController.editPoll)
    .delete('/:id', authMiddleware(permissions.poll.DELETE), validations.poll.delete, PollController.deletePoll);

export const templateRouter: Router = Router()
    .get('/', authMiddleware(permissions.template.READ), TemplateController.getTemplates)
    .get('/external-ids', authMiddleware(permissions.template.READ), TemplateController.getExternalTemplateIds)
    .get('/:id', authMiddleware(permissions.template.READ), validations.template.get, TemplateController.getTemplate)
    .post('/', authMiddleware(permissions.template.CREATE), validations.poll.post, TemplateController.createTemplate)
    .delete('/:id', authMiddleware(permissions.template.DELETE), validations.template.delete, TemplateController.deleteTemplate);

export const externalRouter: Router = Router()
    .get('/:id', validations.poll.get, PollController.getPoll);
