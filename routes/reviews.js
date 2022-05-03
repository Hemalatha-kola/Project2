const express = require('express');
const router = express.Router();
const reviewCtrl = ('../controllers/reviews');

router.post('/books/:id/reviews', reviewCtrl.create);

module.exports = router;