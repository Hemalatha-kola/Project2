const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviewbooks');

router.post('/books/:id/reviews', reviewsCtrl.create);

module.exports = router;