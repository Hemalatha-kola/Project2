const FavBook = require('../models/favBook');
const Book = require('../models/book');

module.exports = {
  new: newFavbook,
  create,
  addToDetails
};

function addToDetails(req, res) {
  // Obtain the movie
  Book.findById(req.params.bookId, function(err, book) {
    // Push the _id of the performer into the movie's cast array
    book.details.push(req.body.favBookId);
    // Save the movie
    book.save(function(err) {
      // Redirect back to the movie show route
      res.redirect(`/books/${book._id}`);
    });
  });
}

function create(req, res) {
  
  const s = req.body.fav;
  
  FavBook.create(req.body, function (err, favBook) {
    res.redirect('/favBooks/favorite');
  });
}

function newFavbook(req, res) {
 FavBook
    .find({})
    .sort('fav')
    .exec(function (err, favBooks) {
      res.render('favBooks/favorite', {
        title: 'Add Details',
        favBooks
      });
  });
}