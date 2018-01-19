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
                return Promise.reject();
            }
            else {
                return user.comparePasswords(password);
            }
        })
        .then((user) => {
            const token = jwt.sign(
                { username: user.username },
                config.keys.secret,
                { expiresIn: '30m' }
            );

            res.json({ success: true, token: 'JWT ' + token });
        })
        .catch(function(error) {
            res.status(401).json({ message: 'Unable to authenticate. Try again.' });
        });
};

module.exports = AuthController;