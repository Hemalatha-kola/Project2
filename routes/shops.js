const express = require('express');
const router = express.Router();
const shopsCtrl = require('../controllers/books');


router.get('/books/:id/shops', shopsCtrl.createShop);
router.get('/shop', shopsCtrl.shopBook);

module.exports = router;