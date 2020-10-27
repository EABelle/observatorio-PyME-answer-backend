const redis = require(process.env.NODE_ENV === 'test' ? 'redis-mock' : 'redis');
const { promisify } = require('util');

const options = process.env.REDISCLOUD_URL ?
    { url: process.env.REDISCLOUD_URL }
    : {
        host: !process.env.NODE_ENV || process.env.NODE_ENV  === 'development' ? 'localhost' : process.env.REDIS_BASE_URL,
        port: process.env.REDIS_PORT || 6379,
    };

const client = redis.createClient(options);
client.on('connect', () => {
    console.log('Connected to Redis cache');
});

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);
export const keysAsync = promisify(client.keys).bind(client);
export const expireAsync = promisify(client.expire).bind(client);

export default client;
