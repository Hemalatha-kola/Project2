const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviewbooks');

router.post('/books/:id/reviews', reviewsCtrl.create);
router.delete('/reviews/:id',reviewsCtrl.delete);

module.exports = router;