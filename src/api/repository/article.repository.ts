import {ArticleModel} from '../../core/model/article.model';
import {Article} from '../../core/domain/Article';
import {ArticlePayload} from '../contract';

export class ArticleRepository {

    static async create(articlePayload: ArticlePayload): Promise<Article> {
        const articleModel = new ArticleModel(articlePayload);
        const article: Article = await articleModel.save();
        return article;
    }

    static async update(id: string, payload: ArticlePayload): Promise<Article | null> {
        return new Promise(async (resolve, reject) => {
            await ArticleModel.update({_id: id}, payload, (err: Error, response: any) => {
                if (err) {
                    reject(err);
                }
                // @ts-ignore
                resolve(response.n ? {_id: id, ...payload} : null);
            });
        });
    }

    static async delete(id: string): Promise<number> {
        const { deletedCount } = await ArticleModel.deleteOne({_id: id});
        return deletedCount;
    }

    static async getByTags(tags: string[]): Promise<Article | Article[]> {
        const articles = await ArticleModel.find({tags: { $all: tags }});
        return articles;
    }
}
