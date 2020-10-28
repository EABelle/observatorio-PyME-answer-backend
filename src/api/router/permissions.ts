const permissions = {
    user: {
        CREATE: 'CREATE_USER',
        READ: 'READ_USER',
        UPDATE: 'UPDATE_USER',
        DELETE: 'DELETE_USER',
    },
    poll: {
        CREATE: 'CREATE_POLL',
        READ: 'READ_POLL',
        UPDATE: 'UPDATE_POLL',
        DELETE: 'DELETE_POLL',
    },
    template: {
        ALL: 'TEMPLATES'
    },
    role: {
        ALL: 'ROLES'
    }
};

export default permissions;
