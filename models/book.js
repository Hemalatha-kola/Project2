const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
   
    price: {type:Number, min:1, max:9999, default:5}
    //reviews: [reviewSchema]

},{
    timestamps:true
});
const reviewSchema = new Schema({
    content: {type: String, required: true},
    rating:{type:Number, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
},{
    timestamps:true
})
module.exports = mongoose.model('Book',bookSchema );