const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favSchema = new Schema({
fav: {type: String, required: true}

})

module.exports = mongoose.model('FavBook', favSchema );