const mysql = require('mysql');

const state = {
    pool: null
};

exports.connect = function(done) {
    mysql.createConnection({multipleStatements: true});
    state.pool = mysql.createPool({
        // host: process.env.SENG365_MYSQL_HOST || 'localhost',
        // port: process.env.SENG365_MYSQL_PORT || 6033,
        // user: 'root',
        // database: "mysql",
        host: 'localhost',
        port: '6033',
        user: 'seng365',
        password: "secret"
    });
    done();
};

exports.get = function() {
    return state.pool;
};