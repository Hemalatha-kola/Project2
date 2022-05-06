const { useColors } = require('debug/src/browser');
const { find } = require('../models/book');
const Book = require('../models/book');
const Shop = require('../models/shop');

const User = require('../models/user');

module.exports = {
    index,
    new:newBook,
    create,
    show,
    createShop,
    shopBook,
    edit,
    update
}



    
function edit(req, res) {
    Book.findById(req.params.id, function(err, editbook) {
        console.log(err);
        res.render("books/edit", {editbook});
    })
};
function update(req, res) {
    
    Book.findByIdAndUpdate(
        
         req.params.id,
        req.body,
         {new: true},
         function(err, book) {
             console.log("update",req.params.id)
             res.redirect(`/books/${book._id}`);
         }
     )
 };

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

// function createShop(req, res ){
//     console.log("+++++++++", req.query)
//     Shop.find({user : req.user.id}, function(err, currentUserShop){
//         req.query.books.id = req.params.id;
//   if (!currentUserShop.length){
      
//     const cart = new Shop();
    
//     console.log("cart +_+_+_+_",cart)
//     cart.user.push(req.user.id);
//     cart.books.push(req.query)


//  cart.save();
//   }else{
      
//     console.log("cart ========", currentUserShop)
//     console.log("request body", req.query)
//     currentUserShop.books.push(req.query)

//   currentUserShop.save(function(err){
//     if(err) return res.redirect('/books');
//     res.redirect(`/shop`);
// });

//   }

 
//     })
        
 

// }
function createShop(req, res ){
  const cart = new Shop(req.body);
 //cart.books.push(req.body)
   cart.save(function(err){
        if(err) return res.redirect('/books');
        res.redirect(`/shop`);
    });

}

function shopBook(req, res){
    
   Shop.find({})
   .populate(`books`)
   .exec(function(err, shop){
    res.render('books/shop',{
        title: 'SHOPPING CART', shop
   })
       
        
        });
        
   
}


