const mongoose = require('mongoose');

const roleSchema = {
    name: String,
    permissions: [String]
};

export const RoleModel = mongoose.model('Role', new mongoose.Schema(roleSchema));

