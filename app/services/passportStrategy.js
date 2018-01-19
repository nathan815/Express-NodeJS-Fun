const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../user/User');
const config = require('./../config');
const Op = require('sequelize').Op;

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
    var options = {};
    
    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.ignoreExpiration = false;

    passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
        console.log('username: '+JWTPayload.username);
        User.findOne({ 
                where: { 
                    username: {[Op.eq]: JWTPayload.username} 
                } })
            .then(function(user) {
                if(!user) {
                    callback(null, false);
                    return;
                }

                callback(null, user);
            });
    }));
}

module.exports = hookJWTStrategy;