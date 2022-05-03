const express = require('express');
const router = express.Router();
const reviewsCtrl = ('../controllers/reviewbooks');

router.post('/books/:id/revews', reviewsCtrl.create);

module.exports = router;