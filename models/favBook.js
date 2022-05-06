const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shopSchema = new Schema({
books : [{
    type:  Schema.Types.ObjectId, ref: "Book"
    
}],
user:{
    type: Array
}

})

module.exports = mongoose.model('Shop', shopSchema );