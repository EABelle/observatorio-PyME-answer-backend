import {NextFunction, Response, Request} from 'express';
import {ArticlePayload, ArticleResponse} from '../contract';
import {Article} from '../../core/domain/Article';
import {ArticleService} from '../service/article.service';
import {validationResult} from 'express-validator';
import {transform, transformList} from '../transformer/articleTransformer';

export class ArticleController {

    public static async getArticles(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const tags: string[] = req.query.tag;
        try {
            const articles: Article[] = await ArticleService.getArticles(tags);
            const articlesResponse: ArticleResponse[] = transformList(articles);
            res.json(articlesResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async createArticle(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const articleRequest: ArticlePayload = req.body;
        try {
            const article: Article = await ArticleService.createArticle(articleRequest);
            const articleResponse: ArticleResponse = transform(article);
            res.json(articleResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async editArticle(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        const articleRequest: ArticlePayload = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const article: Article | null = await ArticleService.updateArticle(id, articleRequest);
            if (!article) {
                return res.status(404).json({message: 'Article not found'});
            }
            const articleResponse: ArticleResponse = transform(article);
            return res.json(articleResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async deleteArticle(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const deleteCount: number = await ArticleService.deleteArticle(id);
            if (!deleteCount) {
                res.status(404);
                res.json({message: 'article not found to delete'});
            }
            res.json({message: `deleted`});
        } catch (e) {
            next(new Error(e.message));
        }
    }
}

