import {Article} from '../../core/domain/Article';
import {ArticleResponse} from '../contract';

export function transform(article: Article): ArticleResponse {
    return {
        id: article._id,
        title: article.title,
        text: article.text,
        tags: article.tags,
        userId: article.userId
    };
}

export function transformList(articles: Article[]): ArticleResponse[] {
    return articles.map(article => transform(article));
}
