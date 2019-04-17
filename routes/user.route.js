const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const utils = require('../utils');

//const user = require('../model/User');

app.get('/', function(req, res){
    res.render('add', { errors: req.session.errors });
    req.session.errors = null;
});

app.post('/add', function(req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    req.checkBody('fname', 'First Name is required').notEmpty();
    req.checkBody('lname', 'Last Name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password does not match').equals(req.body.password);
    req.checkBody('password', 'Password cannot be less than 8 characters').isLength({ min: 8, max:20 });


    const errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        res.redirect('/register');
    }else{
        req.session.success = true;

        var db = utils.getDb();
        db.collection('registration').findOne({username: req.body.username}, function(err, user) {
            if (user == null){
                db. collection('registration').insertOne({
                    fname: fname,
                    lname: lname,
                    username: username,
                    password: password2,
                    password2: password2,

                }, (err, result) => {
                    if (err){
                        res.redirect('/register');
                    }
                    res.redirect('/created');
                });
            }else {
                res.end("Username already exists")
            }
        })
    };

});

module.exports =  app;