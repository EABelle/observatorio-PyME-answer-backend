import {Application} from 'express';
import {pollRouter, userRouter, externalRouter, templateRouter} from './api/router';
import {apiEndpoints, externalApiEndpoints} from './api/config';
import {accessControl} from './common/access-control';
import {fourOFourMiddleware} from './common/404-middleware';
import {authorization} from './common/authorization';
import {graphqlMiddleware} from './graphql';

require('dotenv').config();
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
    .use('/graphql', graphqlMiddleware)
    .use(externalApiEndpoints.polls, authorization, externalRouter)
    .use(apiEndpoints.polls, pollRouter)
    .use(apiEndpoints.templates, templateRouter)
    .use(apiEndpoints.users, userRouter)
    .use(fourOFourMiddleware);

export default app;
