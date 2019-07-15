var express = require('express');
var router = express.Router();
let dbconfig=require('../dbconfig/db-connect');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('shop/index', { title: 'Express' });
  console.log('connected successfully');

  let resultArray =[];

  dbconfig.get().collection('product').find().toArray(function (err, docs) {
    if(!err){
      res.render('shop/index', {items: docs});
    }else {
      console.log(err);
    }
  });

});
module.exports = router;
