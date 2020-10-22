import {ArticlePayload} from '../contract';
import {ArticleRepository} from '../repository/article.repository';
import {Article} from '../../core/domain/Article';

export class ArticleService {

    static async getArticles(tags: string[]): Promise<Article[]> {
        const articles: Article | Article[] = await ArticleRepository.getByTags(tags);
        // @ts-ignore
        return articles.hasOwnProperty('length') ? articles : [articles];
    }

    static async createArticle(articlePayload: ArticlePayload): Promise<Article> {
        return await ArticleRepository.create(articlePayload);
    }

    static async updateArticle(id: string, articlePayload: ArticlePayload): Promise<Article | null> {
        return await ArticleRepository.update(id, articlePayload);
    }

    static async deleteArticle(id: string): Promise<number> {
        return await ArticleRepository.delete(id);
    }
}
