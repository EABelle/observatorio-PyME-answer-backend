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
        CREATE: 'CREATE_TEMPLATE',
        READ: 'READ_TEMPLATE',
        UPDATE: 'UPDATE_TEMPLATE',
        DELETE: 'DELETE_TEMPLATE',
    },
    role: {
        ALL: 'ROLES'
    }
};

export default permissions;
