const db = require('../../config/db');

exports.checkAuth = function (req, done) {
    let authToken = req.header('X-Authorization');

    if (!authToken) {
        return done("not log in");
    }

    db.get().query('SELECT user_id FROM cf_tokens WHERE token=? AND DATEDIFF(expiry, now()) > 0', authToken, function (err, result) {
        if (err) return done(false);
        if (result.length < 1) {
            return done("not account");
        } else {
            return done(result[0].user_id);
        }
    })
};

// recheck
exports.logout = function (req, done) {
    let authToken = req.header('X-Authorization');

    if (!authToken) {
        return done(false);
    }

    db.get().query('UPDATE cf_tokens SET expiry=DATE_SUB(now(), INTERVAL 1 SECOND) WHERE token=?', authToken, function (err, result) {
        if (err) return done(false);
        if (result.affectedRows > 0) {
            return done(true);
        } else {
            return done(false);
        }
    })
};