const mongoose = require('mongoose')


const Schema = mongoose.Schema


const booksSchema = new Schema({
    serialNo: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publicationYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    isAvailable:{
        type: Boolean,
        required: true,
        value: false
    },
    currentUser:{
        type: String
    },
    image: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('BookList', booksSchema)