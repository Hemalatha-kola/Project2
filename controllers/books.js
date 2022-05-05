const { find } = require('../models/book');
const Book = require('../models/book');
const Shop = require('../models/shop');

module.exports = {
    index,
    new:newBook,
    create,
    show,
    createShop,
    shopBook
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
    Book.findById(req.params.id, function(err, book){
        
        res.render('books/show',{
            title: 'Book Details', book
        
        });
        
    });
}

function createShop(req, res ){
    console.log("+++++++++")
    
        const cart = new Shop(req.body);
 //cart.books.push(req.body)
   cart.save(function(err){
        if(err) return res.redirect('/books');
        res.redirect(`/shop`);
    });

}

function shopBook(req, res){
    console.log("#######", )
   Shop.find({}).populate(`books.body`).exec(function(err, shop){
    console.log("heloo+++++++", shop);
    res.render('books/shop',{
        title: 'SHOPPING CART', shop
   })
       
        
        });
        
   
}


