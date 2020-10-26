const mongoose = require('mongoose');

const roleSchema = {
    permissions: [String]
};

export const RoleModel = mongoose.model('Role', new mongoose.Schema(roleSchema));

