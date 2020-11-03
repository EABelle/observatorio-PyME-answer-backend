import {TemplateModel} from '../../core/model/template.model';
import {Template} from '../../core/domain/Template';

export class TemplateRepository {

    static async create(template: Template): Promise<Template> {
        const pollModel = new TemplateModel(template);
        const poll = await pollModel.save();
        return poll.toObject();
    }

    static async delete(id: string): Promise<number> {
        const { deletedCount } = await TemplateModel.deleteOne({_id: id});
        return deletedCount;
    }

    static async getById(id: string): Promise<Template> {
        const poll = await TemplateModel.findOne({_id: id});
        return poll.toObject();
    }

    static async getByExternalId(id: string): Promise<Template> {
        const poll = await TemplateModel.findOne({externalId: id});
        return poll?.toObject();
    }

    static async getTemplates(query = {}): Promise<Template[]> {
        const templates = await TemplateModel.find(query);
        return templates.map((t: any) => t.toObject());
    }
}
