var express = require('express');
var router = express.Router();
let csrf = require('csurf');
let bcrypt = require('bcrypt-nodejs');

let dbconfig = require('../dbconfig/db-connect');

let csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup',function (req,res) {
    res.render('user/signup',{csrfToken:req.csrfToken()});
});

router.post('/signup', function (req,res) {
    let email=req.body.email;
    let password=req.body.password;
    let encryptedPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(),null);
    console.log(email);

    dbconfig.get().collection('user').insertOne({
        email:email,
        password:encryptedPassword
    },function (err,data) {
        if(!err){
            res.redirect('/');
        }
    });
});

router.get('/profile', function (req,res) {
    res.render('user/profile');
});

router.get('/login',function (req,res) {
    res.render('user/login',{csrfToken:req.csrfToken()});
});

router.post('/login', function (req,res,next) {
    let email=req.body.email;
    let password=req.body.password;

    dbconfig.get().collection('user').findOne({ email:email }, function (err, docs) {
        if(!err){
            if(docs){
                if(bcrypt.compareSync(password,docs.password)){
                    console.log(email+' login Success');
                    res.redirect('/user/profile');
                }else {
                    res.end('password missmatch');
                }

            }else {
                res.end('Login Failed');
            }

        }else {
            console.log('Server Error');
        }
    });
});

module.exports = router;