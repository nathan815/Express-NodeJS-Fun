// The User model.
'use strict'; 

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const config = require('../config');
const db = require('../services/database');

const modelOptions = {
    hooks: {
        beforeValidate: hashPassword
    }
};

// 3: Define the User model.
const UserModel = db.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER,
        defaultValue: config.userRoles.user
    }
}, modelOptions);

// Compares two passwords.
UserModel.prototype.comparePasswords = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if(err) 
                throw err;
            if(isMatch) {
                return resolve(this);
            }
            else {
                return reject(new Error('Invalid Credentials'));
            }
        });
    });
};

// Hashes the password for a user object.
function hashPassword(user) {
    if(user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
        });
    }
}

module.exports = UserModel;