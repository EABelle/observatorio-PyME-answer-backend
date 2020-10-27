import {Application} from 'express';
import {pollRouter, userRouter, externalRouter, templateRouter, roleRouter} from './api/router';
import {apiEndpoints, externalApiEndpoints} from './api/config';
import {accessControl} from './core/middlewares/access-control';
import {fourOFourMiddleware} from './core/middlewares/404-middleware';
import {authorization} from './core/middlewares/authorization';

require('dotenv').config();
require('./rabbitmq');

const express = require('express');
const bodyParser = require('body-parser');
const healthcheck = require('express-healthcheck')();
const app: Application = express();
app
    .disable('x-powered-by')
    .get('/health(check)?', healthcheck)
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(accessControl)
    .use(externalApiEndpoints.polls, authorization, externalRouter)
    .use(apiEndpoints.polls, pollRouter)
    .use(apiEndpoints.templates, templateRouter)
    .use(apiEndpoints.users, userRouter)
    .use(apiEndpoints.roles, roleRouter)
    .use(fourOFourMiddleware);

export default app;
