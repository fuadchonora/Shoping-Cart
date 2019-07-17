// let passport = require('passport');
// let LocalStrategy= require('passport-local').Strategy;
//
// var express = require('express');
// let dbconfig = require('../dbconfig/db-connect');
//
// let User = require('../routes/user');
//
// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });
//
// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err,user) {
//         done(err, user);
//     });
// });
//
// passport.use('local.signup',new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
// }, function (req, email, password, done) {
//     dbconfig.get().collection('user').findOne({'email':email}, function (err, user) {
//         console.log(email);
//
//         // if(err){
//         //     return done(err);
//         // }
//         // if(user){
//         //     return done(null, false, {message: 'Email is already in use.'});
//         // }
//
//         // let newUser = new User();
//         // newUser.email = email;
//         // newUser.password = newUser.encryptPassword(password);
//         // newUser.save(function (err, result) {
//         //     if(err){
//         //
//         //         return done(err);
//         //     }
//         //     return done(null, newUser);
//         //
//         // });
//
//         dbconfig.get().collection('user').insertOne({
//             email:email,
//             password:password
//         });
//         return done();
//
//
//     });
// }));