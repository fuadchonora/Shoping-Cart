var express = require('express');
var router = express.Router();
let dbconfig=require('../dbconfig/db-connect');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('shop/index', { title: 'Express' });
  dbconfig.connect(function (err) {
    if(err){
      console.log('DB-Connection Error');
      process.exit(1);
    }else{
      let resultArray =[];
      console.log('connected successfully');

      let cursor = dbconfig.get().collection('product').find();
      cursor.forEach(function (doc, err) {
        if(!err){
          resultArray.push(doc);
        }else {
          console.log(err);
        }
      }, function () {
        res.render('shop/index', {items: resultArray});
      });
    }
  });
});
module.exports = router;
