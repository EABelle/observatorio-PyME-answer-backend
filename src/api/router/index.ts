import {Router} from 'express';
import {UserController} from '../controller/UserController';
import {PollController} from '../controller/PollController';
import {TemplateController} from '../controller/TemplateController';
import {RoleController} from '../controller/RoleController';
import authMiddleware from '../../core/middlewares/auth';
import permissions from './permissions';
import validations from './validations';
import LoginController from '../controller/LoginController';

//  Permissions defined at the route level
export const userRouter: Router = Router()
    .get('/:id', authMiddleware(permissions.user.READ), UserController.getUser)
    .get('/', authMiddleware(permissions.user.READ), UserController.getUsers)
    .post('/', authMiddleware(permissions.user.CREATE), UserController.createUser)
    .put('/:id', authMiddleware(permissions.user.UPDATE), UserController.updateUser)
    .delete('/:id', authMiddleware(permissions.user.DELETE), UserController.deleteUser);

export const pollRouter: Router = Router()
    .get('/:id', authMiddleware(permissions.poll.READ), validations.poll.get, PollController.getPoll)
    .get('/', authMiddleware(permissions.poll.READ), PollController.getPolls)
    .post('/', authMiddleware(permissions.poll.CREATE), validations.poll.post, PollController.createPoll)
    .put('/:id', authMiddleware(permissions.poll.UPDATE), validations.poll.put, PollController.editPoll)
    .delete('/:id', authMiddleware(permissions.poll.DELETE), validations.poll.delete, PollController.deletePoll);

//  Permissions defined at the router level (commons among all the methods and paths)
export const roleRouter: Router = Router()
    .get('/:id', RoleController.getRole)
    .get('/', RoleController.getRoles)
    .post('/', RoleController.createRole)
    .put('/:id', RoleController.updateRole)
    .delete('/:id', RoleController.deleteRole);

export const templateRouter: Router = Router()
    .get('/', TemplateController.getTemplates)
    .get('/external-ids', TemplateController.getExternalTemplateIds)
    .get('/:id', TemplateController.getTemplate)
    .post('/', TemplateController.createTemplate)
    .delete('/:id', TemplateController.deleteTemplate);

export const externalRouter: Router = Router()
    .get('/', PollController.getPolls)
    .get('/:id', validations.poll.get, PollController.getPoll);

export const loginRouter: Router = Router()
    .post('/', validations.login, LoginController.login);
