const db = require('../../config/db.js');

// done
exports.getAll = function (done) {
    db.get().query('SELECT project_id as id, title, subtitle, imageUri FROM cf_projects', function (err, rows) {
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

    db.get().query('INSERT INTO cf_projects (title, subtitle, description, imageUri, target) VALUES (?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) return done(err);

        done(result);
    });
};

// assume
exports.getOne = function (project_id, done) {
    let project_rows;
    let creators_row;
    let rewards_row;
    let backers_row;
    let backers_row_progress;
    db.get().query('SELECT creation_date as creationDate, title, subtitle, description, imageUri, target FROM cf_projects WHERE project_id=?', project_id, function (err, rows) {
        if (err) return done({"error": "error"});
        project_rows = rows[0];
    });

    db.get().query('SELECT user_id as id, name FROM cf_creators WHERE project_id=?', project_id, function (err, rows) {
        if (err) return done({"error": "error"});
        creators_row = rows;
    });

    db.get().query('SELECT reward_id as id, amount, description FROM cf_rewards WHERE project_id=?', project_id, function (err, rows) {
        if (err) return done({"error": "error"});
        rewards_row = rows;
    });

    db.get().query('SELECT SUM(amount) as currentPledged, SUM(*) as numberOfBackers FROM cf_backers WHERE project_id=?', project_id, function (err, rows) {
        if (err) return done({"error": "error"});
        backers_row_progress = rows[0];
    });

    db.get().query('SELECT user_id as name, amount FROM cf_backers WHERE project_id=?', project_id, function (err, rows) {
        if (err) return done({"error": "error"});
        backers_row = rows;
    });

    done({
        "project": {
            "id": project_id,
            "creationDate": project_rows.creationDate,
            "data": {
                "title": project_rows.title,
                "subtitle": project_rows.subtitle,
                "description": project_rows.description,
                "imageUri": project_rows.imageUri,
                "target": project_rows.target,
                "creators": creators_row,
                "rewards": rewards_row
            }
        },
        "progress": {
            "target": project_rows.target,
            "currentPledged": backers_row_progress.currentPledged,
            "numberOfBackers": backers_row_progress.numberOfBackers
        },
        "backers": backers_row
    });
};

exports.alter = function () {
    return null;
};

exports.remove = function () {
    return null;
};