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

export const article1 = {
    'title': 'My Article',
    'text': 'This is my first article',
    'tags': ['tag1', 'tag2'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

export const articleWithoutTitle = {
    'text': 'This is my first article',
    'tags': ['tag1', 'tag2'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

export const articleWithoutText = {
    'title': 'My Article',
    'tags': ['tag1', 'tag2'],
    'userId': '5ddc3ea01614280e2846d3d8'
};

export const articleWithoutUserId = {
    'title': 'My Article',
    'text': 'This is my first article',
    'tags': ['tag1', 'tag2'],
};

export const articleWithEmptyTags = {
    'title': 'My Article',
    'text': 'This is my first article',
    'tags': [],
    'userId': '5ddc3ea01614280e2846d3d8'
};

export const articleUpdatePayload = {
    'title': 'My Article2',
    'text': 'This is my second article',
    'tags': ['tag1', 'tag2', 'tag3'],
    'userId': '5ddc3ea01614280e2846d3d8'
};
