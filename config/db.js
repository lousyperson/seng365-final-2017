const mysql = require('mysql');

const state = {
    pool: null
};

exports.connect = function(done) {
    state.pool = mysql.createPool({
        // host: process.env.SENG365_MYSQL_HOST || 'localhost',
        // port: process.env.SENG365_MYSQL_PORT || 6033,
        host: '192.168.99.100',
        port: '3306',

        database: "mysql",
        user: 'root',
        password: "secret",
        multipleStatements: true
    });
    done();
};

exports.get = function() {
    return state.pool;
};