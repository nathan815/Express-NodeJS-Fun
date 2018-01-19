'use strict';

const jwt = require('jsonwebtoken');

const config = require('../config');
const db = require('../services/database');
const User = require('../models/User');

// The authentication controller.
const AuthController = {};

// Register a user.
AuthController.signUp = function(req, res) {
    console.log(req.body);
    if(!req.body.username || !req.body.password) {
        return res.json({ message: 'Please provide a username and password.' });
    }
    db.sync().then(() => {
        const newUser = {
            username: req.body.username,
            password: req.body.password
        };
        return User.create(newUser);
    }).then(() => {
        res.status(201).json({ message: 'Account created!' })
    }).catch((error) => {
        res.status(403).json({ message: 'Username already exists!' });
    });
}

// Authenticate a user
AuthController.authenticate = function(req, res) {
    if(!req.body.username || !req.body.password) {
        return res.json({ message: 'Username and password are required!' });
    }

    let username = req.body.username,
        password = req.body.password;

    User.findOne({ where: {username: username} })
        .then((user) => {
            if(!user) {
                throw new Error('Username is invalid.');
            }
            else {
                return user.comparePasswords(password);
            }
            a.b();
        })
        .then((user) => {
            const token = jwt.sign(
                { username: user.username },
                config.keys.secret,
                { expiresIn: config.auth.tokenExpiration }
            );

            res.json({ success: true, token: 'JWT ' + token });
        })
        .catch(ReferenceError, function(error) {
            console.log('REF ERR')
        })
        .catch(function(error) {
            let message = error ? error.message : 'Unable to authenticate. Try again.';
            res.status(401).json({ message: message });
        });
};

module.exports = AuthController;