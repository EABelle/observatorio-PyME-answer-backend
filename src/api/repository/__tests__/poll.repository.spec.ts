import {PollRepository} from '../poll.repository';
import {
    poll1,
    pollUpdatePayload,
    pollWithoutSections,
} from '../__mocks__';
import {dbHandler} from '../../../utils';

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('PollRepository ', () => {

    describe('on create method', () => {

        it('can create correctly', async () => {
            await expect(() => PollRepository.create(poll1))
                .not
                .toThrow();
        });

        it(`can't create without sections`, async () => {
            // @ts-ignore
            await expect(PollRepository.create(pollWithoutSections))
                .rejects
                .toThrow();
        });
    });

    describe('on update method', () => {
        it('can update', async () => {
            const poll = await PollRepository.create(poll1);
            await expect(() => PollRepository.update(poll._id, pollUpdatePayload))
                .not
                .toThrow();
        });
    });

    describe('on delete method', () => {
        it('can delete the document', async () => {
            const poll = await PollRepository.create(poll1);
            await expect(() => PollRepository.delete(poll._id))
                .not
                .toThrow();
        });
    });
});
