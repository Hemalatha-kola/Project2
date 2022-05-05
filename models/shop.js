const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shopSchema = new Schema({
books : {
    type: Schema.Types.ObjectId, ref: "Book"
}
})

module.exports = mongoose.model('Shop', shopSchema );