const db = require('../../config/db.js');

// done
exports.getAll = function (done) {
    db.get().query('SELECT project_id as id, title, subtitle, imageUri FROM projects', function (err, rows) {
        if (err) return done({"ERROR": "Error selecting"});

        return done(rows);
    });
};

// done-ish
exports.insert = function (user_data, done) {
    let title = user_data['title'].toString();
    let subtitle = user_data['subtitle'].toString();
    let description = user_data['description'].toString();
    let imageUri = user_data['imageUri'].toString();
    let target = user_data['target'];

    let values = [title, subtitle, description, imageUri, target];

    db.get().query('INSERT INTO projects (title, subtitle, description, imageUri, target) VALUES (?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) return done(err);

        done(result);
    });
};

exports.getOne = function (userId, done) {
    db.get().query('SELECT * FROM projects WHERE user_id = ?', userId, function (err, rows) {
        if (err) return done(err);
        done(rows);
    });
};

exports.alter = function () {
    return null;
};

exports.remove = function () {
    return null;
};