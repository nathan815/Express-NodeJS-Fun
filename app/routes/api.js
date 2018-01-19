const router = require('express').Router();
const config = require('../config');
const AuthController = require('../controllers/AuthController');

module.exports = (password) => {
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticate);
    return router;
};