const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const utils = require('../utils');


app.get('/', function(req, res){
    res.render('login', { errors: req.session.errors });
    req.session.errors = null;
});

app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        res.redirect('/verify');
    }else{
        req.session.success = true;

        var db = utils.getDb();
        db.collection('registration').findOne({username: req.body.username}, function(err, user) {
            if (user === null){
                res.end("Invalid User")
            }else if(user.username === req.body.username && user.password === req.body.password) {
                res.redirect('/mathgame');
            }else {
                res.end("The username or password you entered is incorrect")
            }
        });
    }
})

module.exports =  app;