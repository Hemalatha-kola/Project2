const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const isLoggedIn = require('../config/auth');

router.get("/books/:id/edit", isLoggedIn, booksCtrl.edit);
router.put("/books/:id", isLoggedIn, booksCtrl.update);

module.exports = router;