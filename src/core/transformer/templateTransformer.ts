import {Template} from '../domain/Template';
import {TemplatePayload, TemplateResponse} from '../../api/contract';

export function transformToResponse(template: Template): TemplateResponse {
    const { _id, ...templateDetails } = template;
    return {
        ...templateDetails,
        id: template._id
    };
}

export function transformFromPayload(templatePayload: TemplatePayload): Template {
    return {
        ...templatePayload,
    };
}

export function transformListToResponse(templates: Template[]): TemplateResponse[] {
    return templates.map(template => transformToResponse(template));
}
