import {Router} from 'express';
import {UserController} from '../controller/user.controller';
import {PollController} from '../controller/poll.controller';
import {param, body, query} from 'express-validator';

const validations = {
    user: {
        post: [body('name').exists()]
    },
    poll: {
        get: [query('tag').exists()],
        post: [body('userId').exists()],
        put: [param('id').exists(), body('userId').exists()],
        delete: [param('id').exists()]
    }
};

export const userRouter: Router = Router()
    .post('/', validations.user.post, UserController.createUser);

export const pollRouter: Router = Router()
    .get('/', validations.poll.get, PollController.getPolls)
    .post('/', validations.poll.post, PollController.createPoll)
    .put('/:id', validations.poll.put, PollController.editPoll)
    .delete('/:id', validations.poll.delete, PollController.deletePoll);
