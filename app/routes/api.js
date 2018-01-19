const router = require('express').Router();
const config = require('../config');
const allowOnly = require('../services/routesHelper.js').allowOnly;
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const AdminController = require('../controllers/AdminController');

module.exports = (passport) => {
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticate);
    router.get('/profile', passport.authenticate('jwt', { session: false }), 
        allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), 
        allowOnly(config.accessLevels.admin, AdminController.index));
    return router;
};