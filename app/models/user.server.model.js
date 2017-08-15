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

// done-ish
exports.insert = function (user, password, done) {
    let id = user['id'];  // auto-generate
    let username = user['username'].toString();
    let location = user['location'].toString();
    let email = user['email'].toString();

    let values = [username, location, email, password];

    db.get().query('INSERT INTO users (username, location, email, password) VALUES (?, ?, ?, ?)', values, function (err, result) {
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