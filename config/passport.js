let passport = require('passport');
let LocalStrategy= require('passport-local').Strategy;
let bcrypt = require('bcrypt-nodejs');
let validator = require('express-validator');
var express = require('express');
let dbconfig = require('../dbconfig/db-connect');

// let User = require('../routes/user');

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('local.signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    email = req.body.email;
    password = req.body.password;

    // req.checkBody('email', 'Invalid E-Mail').notEmpty().isEmail();
    // req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:4});
    // let errors = req.validationErrors();
    // if(errors){
    //     let messages = [];
    //     errors.forEach(function (error) {
    //         messages.push(error.msg);
    //     });
    //     return done(null, false, req.flash('error', messages));
    // }

    dbconfig.get().collection('user').findOne({'email':email}, function (err, user) {
        console.log(email);

        if(err){
            console.log('err case');
            return done(err);
        }
        if(user){
            console.log('Email is already in use.');
            return done(null, false, {message: 'Email is already in use.'});
        }
        console.log('Creating New User');

        password = bcrypt.hashSync(password,bcrypt.genSaltSync(),null);

        dbconfig.get().collection('user').insertOne({
            email:email,
            password:password
        },function (err,data) {
            if(err){
                return done(err);
            }
            return done(null, email)
        });

    });
}));

passport.use('local.login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    email = req.body.email;
    password = req.body.password;

    // req.checkBody('email', 'Invalid E-Mail').notEmpty().isEmail();
    // req.checkBody('password', 'Invalid Password').notEmpty();
    // let errors = req.validationErrors();
    // if(errors){
    //     let messages = [];
    //     errors.forEach(function (error) {
    //         messages.push(error.msg);
    //     });
    //     return done(null, false, req.flash('error', messages));
    // }

    dbconfig.get().collection('user').findOne({ email:email }, function (err, user) {
        if(!err){
            if(user){
                if(bcrypt.compareSync(password,user.password)){
                    console.log(email+' login Success');
                    return done(null, user);
                }else {
                    console.log(email+' Wrong Password');
                    return done(null, false, {message:'Wrong Password'});
                }

            }else {
                console.log('No User Found');
                return done(null, false, {message:'No user Found'})
            }

        }else {
            console.log('Server Error');
            return done(err)
        }
    });

}));