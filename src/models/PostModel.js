const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./UserModel')
const postSchema = new Schema({
    title : { 
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }
})
module.exports = mongoose.model('Post', postSchema);