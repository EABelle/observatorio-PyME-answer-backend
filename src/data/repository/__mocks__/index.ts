import pollMock from './poll_1.mock.json';
import {PollPayload} from '../../../api/contract';

export const user1 = {
    name: 'User 1',
    avatar: 'user1.jpg',
};

export const userWithoutName = {
    avatar: 'user1.jpg',
};

export const userWithoutAvatar = {
    name: 'User 1',
};

export const poll1: PollPayload = <PollPayload>pollMock;

export const { sections: _, ...pollWithoutSections } = poll1;

export const pollUpdatePayload = <PollPayload>{
    name: 'My Poll2',
    description: 'This is my second poll',
};
