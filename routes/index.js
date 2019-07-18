var express = require('express');
var router = express.Router();
let dbconfig=require('../dbconfig/db-connect');
let csrf = require('csurf');
let passport = require('passport');
let bcrypt = require('bcrypt-nodejs');

// let csrfProtection = csrf();
// router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('connected successfully');

  dbconfig.get().collection('product').find().toArray(function (err, docs) {
    if(!err){
      res.render('shop/index', {items: docs});
    }else {
      console.log(err);
    }
  });

});

router.get('/add-to-cart/:id', function (req,res, next) {

});


module.exports = router;
