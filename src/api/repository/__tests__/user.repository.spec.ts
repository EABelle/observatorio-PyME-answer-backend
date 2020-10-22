import {UserRepository} from '../user.repository';
import {user1, userWithoutAvatar, userWithoutName} from '../__mocks__';
import {dbHandler} from '../../../utils';

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('UserRepository ', () => {

    describe('on create method', () => {
        it('can create correctly', async () => {
            await expect(() => UserRepository.create(user1))
                .not
                .toThrow();
        });

        it(`can create without an avatar`, async () => {
            // @ts-ignore
            await expect(() => UserRepository.create(userWithoutAvatar))
                .not.toThrow();
        });

        it(`doesn't create without a name`, async () => {
            // @ts-ignore
            await expect(UserRepository.create(userWithoutName))
                .rejects.toThrow();
        });
    });
});
