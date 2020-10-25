import {Template} from '../../core/domain/Template';
import {ExternalTemplateResponse, TemplateResponse} from '../contract';

export function transformToResponse(template: Template): TemplateResponse {
    const { _id, ...templateDetails } = template;
    return {
        ...templateDetails,
        id: template._id
    };
}

export function transformFromExternalResponse(externalTemplateResponse: ExternalTemplateResponse): Template {
    const { id, ...templateDetails } = externalTemplateResponse;
    return {
        ...templateDetails,
        externalId: id
    };
}

export function transformListToResponse(templates: Template[]): TemplateResponse[] {
    return templates.map(template => transformToResponse(template));
}
