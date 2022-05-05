const mongoose = require('mongoose');

const db = mongoose.connection;

//mongoose.connect('mongodb://localhost/samplebooks', {
  //useNewUrlParser: true,
    //useUnifiedTopology: true
//});


mongoose.connect(process.env.DATABASE_URL)

db.on('connected', function (){
    console.log(`connected to mongoDB ${db.host} : ${db.port}`)
});