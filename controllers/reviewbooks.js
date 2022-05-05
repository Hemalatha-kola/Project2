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

// function edit(req, res) {
//   // Note the cool "dot" syntax to query on the property of a subdoc
//   Book.findOne({'reviews._id': req.params.id}, function(err, book) {
//     // Find the comment subdoc using the id method on Mongoose arrays
//     // https://mongoosejs.com/docs/subdocs.html
//     const review = book.reviews.id(req.params.id);
//     // Render the comments/edit.ejs template, passing to it the comment
//     res.render('reviews/edit', {review});
//   });
// }

// function update(req, res) {
//   // Note the cool "dot" syntax to query on the property of a subdoc
//   Book.findOne({'reviews._id': req.params.id}, function(err, book) {
//     // Find the comment subdoc using the id method on Mongoose arrays
//     // https://mongoosejs.com/docs/subdocs.html
//     const commentSubdoc = book.reviews.id(req.params.id);
//     // Ensure that the comment was created by the logged in user
//     if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
//     // Update the text of the comment
//     commentSubdoc.reviewtext = req.body.reviewtext;
//     // Save the updated book
//     book.save(function(err) {
//       // Redirect back to the book's show view
//       res.redirect(`/books/${book._id}`);
//     });
//   });
// }

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
    
    update
    }