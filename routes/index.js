var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fail', function(req, res, next) {
  res.render('fail', { title: 'Express' });
});

/*
router.post('/login', passport.authenticate('local', { failureRedirect: '/', failureFlash: true }), function(req, res) {
  return res.redirect('/projectDetailsEntry');
});
*/
module.exports = router;
