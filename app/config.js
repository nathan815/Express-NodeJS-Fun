// Application Configuration

let config = module.exports;

config.serverPort = 3000;
config.env = process.env.NODE_ENV || 'dev';

config.db = {
    user: 'root', 
    password: 'root123',
    name: 'nodejs'
};

config.db.details = {
    host: 'localhost',
    port: 3306,      
    dialect: 'mysql',
    operatorsAliases: false
};

config.auth = {
	tokenExpiration: '30m'
};

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE='
};

const userRoles = {
    guest: 1,    // ...001
    user: 2,     // ...010
    admin: 4     // ...100
};
config.userRoles = userRoles;

config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
    user: userRoles.user | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100
};