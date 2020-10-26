import {
    expireAsync,
    getAsync,
    keysAsync,
    setAsync
} from '../data/RedisClient';
import {generateGetUserKey, generateSetUserKey} from '../utils';
import {User} from '../domain/User';

const ONE_HOUR = 60 * 60;

export default class CacheService {

    static async getUserFromCacheBySecret(token: string): Promise<User> {
        const key = await generateGetUserKey(token);
        return await JSON.parse(getAsync(key));
    }

    static async getUserFromCacheById(userId: string) {
        const keys = await keysAsync(`*_${userId}`);
        if (!keys || !keys.length) {
            return null;
        }
        const key = keys[0];
        const user = await getAsync(key);
        return JSON.parse(user);
    }

    static async saveUserToCache(token: string, user: User, ttl = ONE_HOUR) {
        const userKey = generateSetUserKey(token, user._id);
        await setAsync(userKey, JSON.stringify({userToken: token, ...user}));
        await expireAsync(userKey, ttl);
    }
}
