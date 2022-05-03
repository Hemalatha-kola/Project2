const Book = require('../models/book');

module.exports = {
    create
}

function create(req,res){
    Book.findById(req.params.id, function(err, book){
        req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    book.reviews.push(req.body);
    book.save(function(err){
        res.redirect(`/books/${book._id}`);

    });
    });
}

