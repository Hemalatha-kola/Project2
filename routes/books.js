const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

//const isLoggedIn = require('../config/auth');

/* GET users listing. */
router.get('/', booksCtrl.index);
  


module.exports = router;
