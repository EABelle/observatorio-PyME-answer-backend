const mongoose = require('mongoose');

const articleSchema = {
    text: String,
    tags: [String],
    title: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
};

export const ArticleModel = mongoose.model('Article', new mongoose.Schema(articleSchema));
