const db = require('../../config/db.js');
const crypto = require('crypto');

exports.getAll = function (done) {
    db.get().query('SELECT * FROM cf_users', function (err, rows) {
        if (err) return done({"ERROR": "Error selecting"});

        return done(rows);
    });
};

// done-ish
exports.getOne = function (userId, done) {
    db.get().query('SELECT user_id as id, username, location, email FROM cf_users WHERE user_id=?', userId, function (err, rows) {
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

    db.get().query('INSERT INTO cf_users (username, location, email, password) VALUES (?, ?, ?, ?)', values, function (err, result) {
        if (err) {
            return done({"error": "Malformed request"});
        }
        if (result.affectedRows === 1) {
            return done({"ok": result.insertId});
        } else {
            return done({"error": "Malformed request"});
        }
    });
};

// done-ish
exports.login = function (user_details, done) {
    let username = user_details['username'].toString();
    let password = user_details['password'].toString();

    let values = [username, password];

    db.get().query('SELECT COUNT(*) AS count, user_id as id FROM cf_users WHERE username=? and password=?', values, function (err, result) {
        if (err || result[0].count !== 1) {
            return done({"error": "Invalid username/password supplied"})
        }
        else {
            let token = crypto.randomBytes(64).toString('hex');
            let update_token_query = "INSERT INTO cf_tokens VALUES (?, ?) ON DUPLICATE KEY UPDATE user_id=?";
            let token_values = [username, token, username];
            db.get().query(update_token_query, token_values, function (err, token_result) {
                return done({"id": result[0].id, "token": token})
            })
        }
    });
};

exports.alter = function () {
    return null;
};

exports.remove = function () {
    return null;
};