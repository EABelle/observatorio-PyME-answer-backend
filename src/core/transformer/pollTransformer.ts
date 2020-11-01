import {Poll, Question, Section} from '../domain/Poll';
import {PollResponse} from '../../api/contract';
import {transformUser} from './userTransformer';
import {UserService} from '../service/UserService';

export function transformQuestions(questions: Question[]): any {
    return questions && questions.map((question: Question) => ({
        type: question.type,
        title: question.title,
        description: question.description,
        mandatory: question.mandatory,
        options: question.options,
        multiline: question.multiline,
        value: question.value,
        restrictions: question.restrictions ? { min: question.restrictions.min, max: question.restrictions.max }  : null,
        questions: question.questions ? transformQuestions(question.questions) : []
    }));
}

export function transformSections(sections: Section[]) {
    return sections.map((section: Section) => ({
        title: section.title,
        description: section.description,
        questions: transformQuestions(section.questions)
    }));
}

export async function transform(poll: Poll): Promise<PollResponse> {
    const { _id, company, created, modified, userId, name, description, sections, status } = poll;
    const response: PollResponse = {
        created: (new Date(created)).toISOString(),
        modified:  (new Date(modified)).toISOString(),
        id: _id,
        name,
        description,
        status,
        sections: transformSections(sections),
    };
    if (company) {
        response.company = {
            id: company._id,
            name: company.name,
        };
    }
    if (userId) {
        response.user = transformUser(await UserService.getUser(poll.userId));
    }
    return response;
}

export function transformList(polls: Poll[]): Promise<PollResponse[]> {
    const promises = polls.map(poll => transform(poll));
    return Promise.all(promises);
}
