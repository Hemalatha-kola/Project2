const Book = require('../models/book');

module.exports = {
create
}

function create(req, res){
    Book.findById(req.params.id, function(err, book){
        req.body.user = req.user._id;
        req.body.userNmae = req.user.name;
        req.body.userAvatar = req.user.avatar;

        book.reviews.push(req.body);
        console.log(req.body);
        book.save(function(err){
            res.redirect(`/books/${book._id}`);
        });
    });
}