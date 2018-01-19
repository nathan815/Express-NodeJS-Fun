// The User model.
'use strict'; 

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const config = require('../config');
const db = require('../services/database');

// 1: The model schema.
const modelDefinition = {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

// 2: The model options.
const modelOptions = {
    instanceMethods: {
        comparePasswords: comparePasswords
    },
    hooks: {
        beforeValidate: hashPassword
    }
};

// 3: Define the User model.
const UserModel = db.define('user', modelDefinition, modelOptions);

UserModel.findAll().then(users => {
  console.log(users)
});

// Compares two passwords.
function comparePasswords(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

// Hashes the password for a user object.
function hashPassword(user) {
    if(user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
        });
    }
}

module.exports = UserModel;