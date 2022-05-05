const Book = require('../models/book');



function create(req, res){ 

    Book.findById(req.params.id, function(err, book){
        req.body.user = req.user._id;
        req.body.userNmae = req.user.name;
        req.body.userAvatar = req.user.avatar;

        book.reviews.push(req.body);
        book.save(function(err){
            res.redirect(`/books/${book._id}`);
        });
    });
}

function update(req, res) {
  Book.findOneAndUpdate(
    {_id: req.params.id, userRecommending: req.user._id},
 
    req.body,
   
    {new: true},
    function(err, book) {
      if (err || !book) return res.redirect('/books');
      res.redirect(`/books/${book._id}`);
    }
  );
}

function deleteReview(req, res, next) {
    // Note the cool "dot" syntax to query on the property of a subdoc
   Book.findOne({'reviews._id': req.params.id}).then(function(book) {
      // Find the review subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const review = book.reviews.id(req.params.id);
      // Ensure that the review was created by the logged in user
      if (!review.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
      // Remove the review using the remove method of the subdoc
      review.remove();
      // Save the updated movie
      book.save().then(function() {
        // Redirect back to the movie's show view
        res.redirect(`/books/${book._id}`);
      }).catch(function(err) {
        // Let Express display an error
        return next(err);
        // res.redirect(`/movies/${movie._id}`);
      });
    });
  }
  

module.exports = {
    create,
    delete: deleteReview,
    update
    }