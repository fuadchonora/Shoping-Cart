var express = require('express');
var router = express.Router();
let csrf = require('csurf');
let bcrypt = require('bcrypt-nodejs');
let passport = require('passport');

let dbconfig = require('../dbconfig/db-connect');

let csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req,res) {
    res.render('user/profile');
});
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
router.use('/',notLoggedIn, function (req, res,next) {
    next();
});

router.get('/signup',function (req,res) {
    let messages = req.flash('error');
    res.render('user/signup',{csrfToken:req.csrfToken(),messages:messages,hasError:messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect:'/user/profile',
    failureRedirect:'/user/signup',
    failureFlash:true
}));

// router.post('/signup', function (req,res) {
//     let email=req.body.email;
//     let password=req.body.password;
//     let encryptedPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(),null);
//     console.log(email);
//
//     dbconfig.get().collection('user').insertOne({
//         email:email,
//         password:encryptedPassword
//     },function (err,data) {
//         if(!err){
//             res.redirect('/');
//         }
//     });
// });


router.get('/login',function (req,res) {
    let messages = req.flash('error');
    res.render('user/login',{csrfToken:req.csrfToken(),messages:messages,hasError:messages.length > 0});
});
router.post('/login', passport.authenticate('local.login', {
    successRedirect:'/user/profile',
    failureRedirect:'/user/login',
    failureFlash:true
}));



// router.post('/login', function (req,res,next) {
//     let email=req.body.email;
//     let password=req.body.password;
//
//     dbconfig.get().collection('user').findOne({ email:email }, function (err, docs) {
//         if(!err){
//             if(docs){
//                 if(bcrypt.compareSync(password,docs.password)){
//                     console.log(email+' login Success');
//                     res.redirect('/user/profile');
//                 }else {
//                     res.end('password missmatch');
//                 }
//
//             }else {
//                 res.end('Invalid Username or Password');
//             }
//
//         }else {
//             console.log('Server Error');
//         }
//     });
// });

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
