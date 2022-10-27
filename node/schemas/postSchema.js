const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
})

const exportUser = mongoose.model('newUserPostSchema', postSchema)

module.exports = exportUser