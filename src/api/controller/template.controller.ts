import {NextFunction, Response, Request} from 'express';
import {TemplateResponse} from '../contract';
import {Template} from '../../core/domain/Template';
import {TemplateService} from '../service/template.service';
import {validationResult} from 'express-validator';
import {transform, transformList} from '../transformer/templateTransformer';

export class TemplateController {

    public static async getTemplates(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const templates: Template[] = await TemplateService.getTemplates();
            const templatesResponse: TemplateResponse[] = transformList(templates);
            res.json(templatesResponse);
        } catch (e) {
            next(new Error(e.message));
        }
    }
    public static async getTemplate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const template: Template = await TemplateService.getTemplate(id);
            const response: TemplateResponse = transform(template);
            res.json(response);
        } catch (e) {
            next(new Error(e.message));
        }
    }

    public static async deleteTemplate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try {
            const deleteCount: number = await TemplateService.deleteTemplate(id);
            if (!deleteCount) {
                res.status(404);
                res.json({message: 'template not found to delete'});
            }
            res.json({message: `deleted`});
        } catch (e) {
            next(new Error(e.message));
        }
    }
}

