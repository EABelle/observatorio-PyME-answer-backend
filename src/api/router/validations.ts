import {body, param} from 'express-validator';

const validations = {
    user: {
        post: [body('name').exists()],
        getMany: []
    },
    poll: {
        get: [param('id').exists()],
        post: [],
        postFromTemplate: [body('user').exists(), body('template').exists()],
        put: [param('id').exists(), body('userId').exists()],
        delete: [param('id').exists()]
    },
    template: {
        get: [],
        delete: [param('id').exists()]
    },
    login: [body('userName').exists(), body('password').exists()]
};

export default validations;
