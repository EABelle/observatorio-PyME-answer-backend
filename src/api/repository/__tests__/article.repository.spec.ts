import {ArticleRepository} from '../article.repository';
import {
    article1,
    articleUpdatePayload,
    articleWithEmptyTags,
    articleWithoutText,
    articleWithoutTitle, articleWithoutUserId,
} from '../__mocks__';
import {dbHandler} from '../../../utils';

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('ArticleRepository ', () => {

    describe('on create method', () => {

        it('can create correctly', async () => {
            await expect(() => ArticleRepository.create(article1))
                .not
                .toThrow();
        });

        it(`can create without a title`, async () => {
            // @ts-ignore
            await expect(() => ArticleRepository.create(articleWithoutTitle))
                .not
                .toThrow();
        });

        it(`can create without a text`, async () => {
            // @ts-ignore
            await expect(() => ArticleRepository.create(articleWithoutText))
                .not
                .toThrow();
        });

        it(`can create with empty tags`, async () => {
            // @ts-ignore
            await expect(() => ArticleRepository.create(articleWithEmptyTags))
                .not
                .toThrow();
        });

        it(`can't create without a userId`, async () => {
            // @ts-ignore
            await expect(ArticleRepository.create(articleWithoutUserId))
                .rejects
                .toThrow();
        });
    });

    describe('on update method', () => {
        it('can update', async () => {
            const article = await ArticleRepository.create(article1);
            await expect(() => ArticleRepository.update(article._id, articleUpdatePayload))
                .not
                .toThrow();
        });
    });

    describe('on delete method', () => {
        it('can delete the document', async () => {
            const article = await ArticleRepository.create(article1);
            await expect(() => ArticleRepository.delete(article._id))
                .not
                .toThrow();
        });
    });
});
