const db = require('../../config/db.js');

exports.getAll = function (done) {
    db.get().query('SELECT * FROM users', function (err, rows) {
        if (err) return done({"ERROR": "Error selecting"});

        return done(rows);
    });
};

exports.getOne = function (userId, done) {
    db.get().query('SELECT * FROM users WHERE user_id = ?', userId, function (err, rows) {
        if (err) return done(err);
        done(rows);
    });
};

exports.insert = function (username, done) {
    let values = [username];

    db.get().query('INSERT INTO users (username) VALUES ?', values, function (err, result) {
        if (err) return done(err);

        done(result);
    });
};

exports.alter = function () {
    return null;
};

exports.remove = function () {
    return null;
};