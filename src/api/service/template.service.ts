import {ExternalTemplateResponse, TemplatePayload} from '../contract';
import {TemplateRepository} from '../repository/template.repository';
import {Template} from '../../core/domain/Template';
import {getTemplates} from '../externalApiClient';

export class TemplateService {

    static async getTemplates(): Promise<Template[]> {
        const externalTemplates = await this.getExternalTemplates();
        await this.saveNewTemplates(externalTemplates);
        return await TemplateRepository.getAll();
    }

    static getTemplate(id: string): Promise<Template> {
        return TemplateRepository.getById(id);
    }

    static async saveNewTemplates(externalTemplates: ExternalTemplateResponse[]) {
        const saveTemplateIfNewPromises = externalTemplates.map(this.saveTemplateIfNew);
        const newTemplates = await Promise.all(saveTemplateIfNewPromises);
        return newTemplates.filter(Boolean);
    }

    static async saveTemplateIfNew(externalTemplate: ExternalTemplateResponse) {
        const template = await this.getTemplate(externalTemplate.id);
        if (!template) {
            return await this.createTemplate(template);
        } return;
    }

    static async createTemplate(templatePayload: TemplatePayload): Promise<Template> {
        return await TemplateRepository.create(templatePayload);
    }

    static async deleteTemplate(id: string): Promise<number> {
        return await TemplateRepository.delete(id);
    }

    static async getExternalTemplates(): Promise<ExternalTemplateResponse[]> {
        try {
            const response = await getTemplates();
            return response.data;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}
