import {Template} from '../domain/Template';
import {TemplatePayload, TemplateResponse} from '../../api/contract';
import {PollService} from '../service/PollService';

export async function transformToResponse(template: Template): Promise<TemplateResponse> {
    const { _id, created, ...templateDetails } = template;
    const sentCount = await PollService.getPollsCountByTemplateId(<string>_id);
    return {
        ...templateDetails,
        created: (new Date(created)).toISOString(),
        id: template._id,
        sentCount,
    };
}

export function transformFromPayload(templatePayload: TemplatePayload): Template {
    const { created, ...templateDetails } = templatePayload;
    return {
        created: new Date(created),
        ...templateDetails,
    };
}

export function transformListToResponse(templates: Template[]): Promise<TemplateResponse[]> {
    const promises = templates.map(template => transformToResponse(template));
    return Promise.all(promises);
}
