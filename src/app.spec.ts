import app from './app';
import {apiEndpoints} from './api/config';

const request = require('supertest');

const createUserRequestFixture = (req?: any) => ({
    ...{name: 'aName', avatar: 'anAvatar'},
    ...req
});

const createPollRequestFixture = (req?: any) => ({
    _id: 'anId',
    title: 'My Poll',
    text: 'This is my first poll',
    tags: ['tag1', 'tag2'],
    userId: 'aUserId',
    ...req
});

const UserRepository = require('./data/repository/user.repository');
jest.mock('./api/repository/user.repository');

const PollRepository = require('./data/repository/poll.repository');
jest.mock('./api/repository/poll.repository');

describe('app', () => {

    const DEFAULT_API_KEY = process.env.API_KEY;
    const TEST_API_KEY = 'TEST_API_KEY';
    const NOT_VALID_API_KEY = 'NOT_VALID_API_KEY';

    describe('Not functional endpoints', () => {

        beforeEach(() => {
            jest.resetModules(); // this is important - it clears the cache
            process.env.API_KEY = TEST_API_KEY;
        });

        afterEach(() => {
            process.env.API_KEY = DEFAULT_API_KEY;
        });

        it('should check health', async () => {
            await request(app)
                .get('/health')
                .set('x-api-key', TEST_API_KEY)
                .expect(200);
        });

        it('should return 404 when an endpoint is not valid', async () => {
            await request(app)
                .get('/not-valid')
                .set('x-api-key', TEST_API_KEY)
                .expect(404);
        });
    });



    describe('Authorization', () => {

        beforeEach(() => {
            jest.resetModules(); // this is important - it clears the cache
            process.env.API_KEY = TEST_API_KEY;
        });

        afterEach(() => {
            process.env.API_KEY = DEFAULT_API_KEY;
        });

        it('should return 401 when the API Key is not valid', async () => {
            await request(app)
                .get('/')
                .set('x-api-key', NOT_VALID_API_KEY)
                .expect(401);
        });

        it('should not return 401 when the API Key is valid', async () => {
            await request(app)
                .get('/')
                .set('x-api-key', TEST_API_KEY)
                .expect((res: any) => res.status !== 401);
        });
    });

    describe('POST /users', () => {

        beforeAll(() => {
            jest.resetModules();
            process.env.API_KEY = TEST_API_KEY;
        });

        it('should save a user when the user is valid', async () => {
            const createUser = jest.fn();
            createUser.mockReturnValueOnce(new Promise (resolve => resolve({
                _id: 'anId',
                name: 'aName',
                avatar: 'anAvatar'
            })));
            UserRepository.UserRepository.create = createUser;
            await request(app)
                .post(apiEndpoints.users)
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createUserRequestFixture())
                .expect('Content-Type', /json/)
                .expect(200, {
                    id: 'anId',
                    name: 'aName',
                    avatar: 'anAvatar'
                });
        });

        it('should return a 400 when the user from request does not have name', async () => {
            const createUser = jest.fn();
            createUser.mockReturnValueOnce(new Promise (resolve => resolve({
                _id: 'anId',
                name: 'aName',
                avatar: 'anAvatar'
            })));
            UserRepository.UserRepository.create = createUser;
            await request(app)
                .post(apiEndpoints.users)
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createUserRequestFixture({name: undefined}))
                .expect('Content-Type', /json/)
                .expect(400);
        });
    });

    describe('POST /polls', () => {

        beforeEach(() => {
            jest.resetModules();
            process.env.API_KEY = TEST_API_KEY;
        });

        afterEach(() => {
            process.env.API_KEY = DEFAULT_API_KEY;
        });

        it('should return 400 a users when the request body does not have userId', async () => {
            await request(app)
                .post(apiEndpoints.users)
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createPollRequestFixture({userId: undefined}))
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should return 200 for valid polls', async () => {
            const createPoll = jest.fn();
            createPoll.mockReturnValueOnce(new Promise (resolve => resolve({
                '_id': 'anId',
                'title': 'My Poll',
                'text': 'This is my first poll',
                'tags': ['tag1', 'tag2'],
                'userId': 'aUserId'
            })));
            PollRepository.PollRepository.create = createPoll;
            await request(app)
                .post(apiEndpoints.polls)
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createPollRequestFixture())
                .expect('Content-Type', /json/)
                .expect(200, {
                    id: 'anId',
                    title: 'My Poll',
                    text: 'This is my first poll',
                    tags: ['tag1', 'tag2'],
                    userId: 'aUserId'
                });
        });
    });

    describe('PUT /polls', () => {

        beforeEach(() => {
            jest.resetModules();
            process.env.API_KEY = TEST_API_KEY;
        });

        afterEach(() => {
            process.env.API_KEY = DEFAULT_API_KEY;
        });

        it('should return 400 a users when the request body does not have a userId', async () => {
            await request(app)
                .put(apiEndpoints.polls  + '/anId')
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createPollRequestFixture({userId: undefined}))
                .expect('Content-Type', /json/)
                .expect(400);
        });

        it('should return 404 when the poll id is not found', async () => {
            const updatePoll = jest.fn();
            updatePoll.mockReturnValueOnce(new Promise (resolve => resolve(null)));
            PollRepository.PollRepository.update = updatePoll;
            await request(app)
                .put(apiEndpoints.polls)
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createPollRequestFixture())
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('should return 200 when the poll id is found', async () => {

            const updatePoll = jest.fn();
            updatePoll.mockReturnValueOnce(new Promise (resolve => resolve({
                '_id': 'anId',
                'title': 'My Poll',
                'text': 'This is my first poll',
                'tags': ['tag1', 'tag2'],
                'userId': 'aUserId'
            })));
            PollRepository.PollRepository.update = updatePoll;
            await request(app)
                .put(apiEndpoints.polls + '/anId')
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .send(createPollRequestFixture({'text': 'changedText'}))
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('DELETE /polls', () => {

        beforeEach(() => {
            jest.resetModules();
            process.env.API_KEY = TEST_API_KEY;
        });

        afterEach(() => {
            process.env.API_KEY = DEFAULT_API_KEY;
        });

        it('should return 404 when the poll id is not found', async () => {
            const deletePoll = jest.fn();
            deletePoll.mockReturnValueOnce(Promise.resolve(0));
            PollRepository.PollRepository.delete = deletePoll;
            await request(app)
                .delete(apiEndpoints.polls + '/notValid')
                .set('x-api-key', TEST_API_KEY)
                .send()
                .expect('Content-Type', /json/)
                .expect(404);
        });

        it('should return 200 when the poll id is found', async () => {

            const deletePoll = jest.fn();
            deletePoll.mockReturnValueOnce(Promise.resolve(1));
            PollRepository.PollRepository.delete = deletePoll;
            await request(app)
                .delete(apiEndpoints.polls + '/notValid')
                .set('x-api-key', TEST_API_KEY)
                .send()
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('GET /polls', () => {

        beforeEach(() => {
            jest.resetModules();
            process.env.API_KEY = TEST_API_KEY;
        });

        afterEach(() => {
            process.env.API_KEY = DEFAULT_API_KEY;
        });

        it('should return 400 when the request does not have at least one tag as query param', async () => {
            await request(app)
                .get(apiEndpoints.polls)
                .set('Accept', 'application/json')
                .set('x-api-key', TEST_API_KEY)
                .expect(400);
        });

        it('should return 200 when the poll has one tag', async () => {

            const getPolls = jest.fn();
            getPolls.mockReturnValueOnce(Promise.resolve({
                '_id': 'anId',
                'title': 'My Poll',
                'text': 'This is my first poll',
                'tags': ['tag1', 'tag2'],
                'userId': 'aUserId'
            }));
            PollRepository.PollRepository.getByTags = getPolls;
            await request(app)
                .get(apiEndpoints.polls)
                .query({'tag': 'tag1'})
                .set('x-api-key', TEST_API_KEY)
                .expect('Content-Type', /json/)
                .expect(200, [{
                    'id': 'anId',
                    'title': 'My Poll',
                    'text': 'This is my first poll',
                    'tags': ['tag1', 'tag2'],
                    'userId': 'aUserId'
                }]);
        });

        it('should return 200 when the poll has many tags', async () => {

            const getPolls = jest.fn();
            getPolls.mockReturnValueOnce(Promise.resolve({
                '_id': 'anId',
                'title': 'My Poll',
                'text': 'This is my first poll',
                'tags': ['tag1', 'tag2'],
                'userId': 'aUserId'
            }));
            PollRepository.PollRepository.getByTags = getPolls;
            await request(app)
                .get(apiEndpoints.polls)
                .query({'tag': 'tag1'})
                .query({'tag': 'tag2'})
                .set('x-api-key', TEST_API_KEY)
                .expect('Content-Type', /json/)
                .expect(200, [{
                    'id': 'anId',
                    'title': 'My Poll',
                    'text': 'This is my first poll',
                    'tags': ['tag1', 'tag2'],
                    'userId': 'aUserId'
                }]);
        });
    });
});

