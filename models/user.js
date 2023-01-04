const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    username: String,
    profilePicture: String,
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
    }]
})
module.exports = mongoose.model('User', userSchema);