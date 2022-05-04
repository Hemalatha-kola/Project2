const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

const isLoggedIn = require('../config/auth');

/* GET users listing. */
router.get('/', booksCtrl.index);
router.get('/new', isLoggedIn, booksCtrl.new);
router.post('/', isLoggedIn, booksCtrl.create);
router.get('/:id', isLoggedIn, booksCtrl.show);
router.post('/shop', booksCtrl.createshop);
router.get('/', booksCtrl.shopBook);




module.exports = router;
