const mongoose = require('mongoose');

const userSchema = {
    name: {type: String, required: true},
    avatar: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    roles: [String]
};

export const UserModel = mongoose.model('User', new mongoose.Schema(userSchema));

