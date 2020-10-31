import {Application} from 'express';
import {pollRouter, userRouter, externalRouter, templateRouter, roleRouter, loginRouter, generalRouter} from './api/router';
import {apiEndpoints, externalApiEndpoints} from './api/config';
import {accessControl} from './core/middlewares/access-control';
import {fourOFourMiddleware} from './core/middlewares/404-middleware';
import {authorization} from './core/middlewares/authorization';
import authMiddleware from './core/middlewares/auth';
import permissions from './api/router/permissions';

require('dotenv').config();
require('newrelic');
require('./rabbitmq');

const express = require('express');
const bodyParser = require('body-parser');
const healthcheck = require('express-healthcheck')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const cors = require('cors');

const app: Application = express();
app
    .use(cors())
    .use(accessControl)
    .disable('x-powered-by')
    .get('/health(check)?', healthcheck)
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(externalApiEndpoints.polls, authorization, externalRouter)
    .use(apiEndpoints.templates, authMiddleware(permissions.template.ALL), templateRouter)
    .use(apiEndpoints.roles, authMiddleware(permissions.role.ALL), roleRouter)
    .use(apiEndpoints.polls, pollRouter)
    .use(apiEndpoints.users, userRouter)
    .use(apiEndpoints.login, loginRouter)
    .use('/', generalRouter)
    .use(apiEndpoints.docs, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(fourOFourMiddleware);

export default app;
