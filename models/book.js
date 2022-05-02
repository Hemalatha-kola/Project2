const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName: String,
    Author: String,
    details: String,
    price: Number
},{
    timestamps:true
});

module.exports = mongoose.model('Book',bookSchema );