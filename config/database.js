const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/samplebooks', {
   useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
//mongoose.connect(process.env.DATABASE_URL)

db.on('connected', function (){
    console.log(`connected to mongoDB ${db.host} : ${db.port}`)
});