const Book = require('../models/book');



function create(req, res){ 

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



function deleteReview(req, res, next) {
   Book.findOne({'reviews._id': req.params.id}).then(function(book) {
      const review = book.reviews.id(req.params.id);
      if (!review.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
      review.remove();
      book.save().then(function() {
        res.redirect(`/books/${book._id}`);
      }).catch(function(err) {
        return next(err);
      });
    });
  }
  

module.exports = {
    create,
    delete: deleteReview,
    
    
    }