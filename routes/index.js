var express = require('express');
var router = express.Router();
let dbconfig=require('../dbconfig/db-connect');
let csrf = require('csurf');

let csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('shop/index', { title: 'Express' });
  console.log('connected successfully');


  dbconfig.get().collection('product').find().toArray(function (err, docs) {
    if(!err){
      res.render('shop/index', {items: docs});
    }else {
      console.log(err);
    }
  });

});

router.get('/user/signup',function (req,res) {
  res.render('user/signup',{csrfToken:req.csrfToken});
});

module.exports = router;
