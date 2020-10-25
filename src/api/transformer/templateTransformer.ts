import {Template} from '../../core/domain/Template';
import {TemplateResponse} from '../contract';

export function transform(template: Template): TemplateResponse {
    const { _id, ...templateDetails } = template;
    return {
        ...templateDetails,
        id: template._id
    };
}

export function transformList(templates: Template[]): TemplateResponse[] {
    return templates.map(template => transform(template));
}
