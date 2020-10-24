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

export const poll1 = {
    'title': 'My Poll',
    'text': 'This is my first poll',
    'tags': ['tag1', 'tag2'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

export const pollWithoutTitle = {
    'text': 'This is my first poll',
    'tags': ['tag1', 'tag2'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

export const pollWithoutText = {
    'title': 'My Poll',
    'tags': ['tag1', 'tag2'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

export const pollWithoutUserId = {
    'title': 'My Poll',
    'text': 'This is my first poll',
    'tags': ['tag1', 'tag2'],
};

export const pollWithEmptyTags = {
    'title': 'My Poll',
    'text': 'This is my first poll',
    'tags': [],
    'userId': '5ddc3ea01614280e2846d3d8'
};

export const pollUpdatePayload = {
    'title': 'My Poll2',
    'text': 'This is my second poll',
    'tags': ['tag1', 'tag2', 'tag3'],
    'userId': '5ddc3ea01614280e2846d3d8'
};
