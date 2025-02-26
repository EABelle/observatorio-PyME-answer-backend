const mongoose = require('mongoose');

const userSchema = {
    name: {type: String, required: true},
    avatar: String,
    email: {type: String, required: true},
    confirmed: {type: Boolean, required: true},
    password: {type: String},
    roles: [String],
    company: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        name: String,
    }
};

export const UserModel = mongoose.model('User', new mongoose.Schema(userSchema));

