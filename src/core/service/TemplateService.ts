import {TemplateRepository} from '../../data/repository/template.repository';
import {Template} from '../domain/Template';


export class TemplateService {

    static getTemplates(query?: Object): Promise<Template[]> {
        return TemplateRepository.getTemplates(query);
    }

    static async getExternalTemplateIds(): Promise<String[]> {
        const templates: Template[] = await TemplateRepository.getTemplates();
        return <String[]>templates.map(t => t.externalId).filter(Boolean);
    }

    static getTemplate(id: string): Promise<Template> {
        return TemplateRepository.getById(id);
    }

    static getTemplateByExternalId(id: string): Promise<Template> {
        return TemplateRepository.getByExternalId(id);
    }

    static async saveTemplateIfNew(template: Template): Promise<Template | null> {
        const foundTemplate: Template = await this.getTemplateByExternalId(<string>template.externalId);
        if (!foundTemplate) {
            return await this.createTemplate(template);
        } return null;
    }

    static createTemplate(template: Template): Promise<Template> {
        return TemplateRepository.create(template);
    }

    static deleteTemplate(id: string): Promise<number> {
        return TemplateRepository.delete(id);
    }
}
