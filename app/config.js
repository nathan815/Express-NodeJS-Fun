// Application Configuration

let config = module.exports;

config.serverPort = 3000;
config.env = process.env.NODE_ENV || 'dev';

config.db = {
    user: 'root', 
    password: 'root',
    name: 'nodejs'
};

config.db.details = {
    host: 'localhost',
    port: 3306,      
    dialect: 'mysql',
    operatorsAliases: false
};

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE='
};