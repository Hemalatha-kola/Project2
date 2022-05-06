const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewtext: {type: String, required: true},
    rating:{type:Number, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
},{
    timestamps:true
})



const bookSchema = new Schema({
    title: String,
    author: String,
   
    price: {type:Number, min:1, max:9999, default:5},
    reviews: [reviewSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User" 
    },
    userName: String,
    userAvatar: String,
    details: [{
        type: Schema.Types.ObjectId,
        ref: 'FavBook'
    }]

},{
    timestamps:true
});

module.exports = mongoose.model('Book',bookSchema );