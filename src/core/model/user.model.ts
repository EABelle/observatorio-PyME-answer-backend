const mongoose = require('mongoose');

const userSchema = {
    name: {type: String, required: true},
    avatar: String
};

export const UserModel = mongoose.model('User', new mongoose.Schema(userSchema));

