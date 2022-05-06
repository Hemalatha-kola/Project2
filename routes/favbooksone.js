const express = require('express');
const router = express.Router();
const favbooksCtrl = require('../controllers/favBooks');

router.get('/favBooks/favorite', favbooksCtrl.new);
router.post('/favBooks', favbooksCtrl.create);
router.post('/books/:bookId/favBooks', favbooksCtrl.addToDetails)

module.exports = router;