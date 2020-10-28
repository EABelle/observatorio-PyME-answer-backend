import {Template} from '../domain/Template';
import {TemplatePayload, TemplateResponse} from '../../api/contract';

export function transformToResponse(template: Template): TemplateResponse {
    const { _id, created, ...templateDetails } = template;
    return {
        ...templateDetails,
        created: (new Date(created)).toISOString(),
        id: template._id
    };
}

export function transformFromPayload(templatePayload: TemplatePayload): Template {
    const { created, ...templateDetails } = templatePayload;
    return {
        created: new Date(created),
        ...templateDetails,
    };
}

export function transformListToResponse(templates: Template[]): TemplateResponse[] {
    return templates.map(template => transformToResponse(template));
}
