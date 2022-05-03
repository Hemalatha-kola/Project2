const Book = require('../models/book');

module.exports = {
    index,
    new:newBook
}

function index(req, res) {
    Book.find({}, function(err, books) {
      res.render('books/index', { title: 'World Of Wonders', books });
    });
  }

function newBook(req, res){
    res.render('books/new', {title: 'Add Book' });
}