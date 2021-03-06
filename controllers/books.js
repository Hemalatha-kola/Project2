const { useColors } = require('debug/src/browser');
const { find } = require('../models/book');
const Book = require('../models/book');
const Shop = require('../models/favBook');
const List = require('../models/shop');

const User = require('../models/user');

module.exports = {
    index,
    new:newBook,
    create,
    show,
    createShop,
    shopBook,
   
}

function index(req, res) {
    Book.find({}, function(err, books) {
      res.render('books/index', { title: 'World Of Wonders', books });
    });
  }

function newBook(req, res){
    res.render('books/new', {title: 'Add Book' });
}

function create(req, res){

    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
    const book = new Book(req.body);
    book.save(function(err){
        if (err) return res.redirect('/books/new');
        res.redirect(`/books/${book._id}`);
    });
   

}

function show(req, res){
    Book.findById(req.params.id).populate('details').exec(function(err, book){
        Shop.find({_id:{$nin: book.details}})
        .sort('fav').exec(function(err,favBooks){
            res.render('books/show',{
                title: 'Book Details', book, favBooks
            
            });
        })
        
        
    });
}

function createShop(req, res ){
  const cart = new Shop(req.body);
 //cart.books.push(req.body)
   cart.save(function(err){
        if(err) return res.redirect('/books');
        res.redirect(`/shop`);
    });

}

function shopBook(req, res){
    
   List.find({})
   .populate(`books`)
   .exec(function(err, list){
    res.render('books/shop',{
        title: 'FAVOURITE LIST', list
   })
    
        
        });
        
   
}


