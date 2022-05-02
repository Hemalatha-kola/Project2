const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', function(req, res, next) {
  res.redirect('/books');
});

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect : '/books',
      failureRedirect : '/books'
    }
));


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/books');
});


module.exports = router;