import {ExternalTemplateResponse, TemplatePayload} from '../contract';
import {TemplateRepository} from '../repository/template.repository';
import {Template} from '../../core/domain/Template';
import {getTemplates} from '../externalApiClient';
import {transformFromExternalResponse} from '../transformer/templateTransformer';
import {AxiosResponse} from 'axios';

export class TemplateService {

    static async getTemplates(): Promise<Template[]> {
        const externalTemplates: ExternalTemplateResponse[] = await this.getExternalTemplates();
        await this.saveNewTemplates(externalTemplates);
        return await TemplateRepository.getAll();
    }

    static getTemplate(id: string): Promise<Template> {
        return TemplateRepository.getById(id);
    }

    static getTemplateByExternalId(id: string): Promise<Template> {
        return TemplateRepository.getByExternalId(id);
    }

    static async saveNewTemplates(externalTemplates: ExternalTemplateResponse[]): Promise<Template[]> {
        const templates: Template[] = externalTemplates.map(transformFromExternalResponse);
        const saveTemplateIfNewPromises: Promise<Template | null>[] = templates.map(this.saveTemplateIfNew);
        const newTemplates: (Template | null)[] = await Promise.all(saveTemplateIfNewPromises);
        return <Template[]>newTemplates.filter(Boolean);
    }

    static async saveTemplateIfNew(template: Template): Promise<Template | null> {
        const foundTemplate: Template = await this.getTemplateByExternalId(template.externalId);
        if (!foundTemplate) {
            return await this.createTemplate(template);
        } return null;
    }

    static createTemplate(templatePayload: TemplatePayload): Promise<Template> {
        return TemplateRepository.create(templatePayload);
    }

    static deleteTemplate(id: string): Promise<number> {
        return TemplateRepository.delete(id);
    }

    static async getExternalTemplates(): Promise<ExternalTemplateResponse[]> {
        try {
            const response: AxiosResponse<ExternalTemplateResponse[]> = await getTemplates();
            return response.data;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}
