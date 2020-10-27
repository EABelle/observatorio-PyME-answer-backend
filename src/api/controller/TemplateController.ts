import {NextFunction, Response, Request} from 'express';
import {TemplatePayload, TemplateResponse} from '../contract';
import {Template} from '../../core/domain/Template';
import {TemplateService} from '../../core/service/TemplateService';
import {validationResult} from 'express-validator';
import {transformToResponse, transformListToResponse, transformFromPayload} from '../../core/transformer/templateTransformer';

export class TemplateController {

    public static async getTemplates(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const templates: Template[] = await TemplateService.getTemplates();
            const templatesResponse: TemplateResponse[] = transformListToResponse(templates);
          return res.json(templatesResponse);
        } catch (e) {
          return next(new Error(e.message));
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
            const response: TemplateResponse = transformToResponse(template);
          return res.json(response);
        } catch (e) {
          return next(new Error(e.message));
        }
    }

    public static async getExternalTemplateIds(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const externalTemplateIds: String[] = await TemplateService.getExternalTemplateIds();
          return res.json(externalTemplateIds);
        } catch (e) {
          return next(new Error(e.message));
        }
    }
    public static async createTemplate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const templateRequest: TemplatePayload = req.body;
        try {
            const template: Template = await TemplateService.createTemplate(transformFromPayload(templateRequest));
            const templateResponse: TemplateResponse = transformToResponse(template);
            return res.json(templateResponse);
        } catch (e) {
          return next(new Error(e.message));
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
                return res.status(404).json({message: 'template not found to delete'});
            }
          return res.json({message: `deleted`});
        } catch (e) {
          return next(new Error(e.message));
        }
    }
}

