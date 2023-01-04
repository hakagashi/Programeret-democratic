const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: String,
    text: String,
    image: String,
    date: Date,
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Blog', blogSchema);