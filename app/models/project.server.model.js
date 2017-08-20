const db = require('../../config/db.js');

// done
exports.getAll = function (done) {
    db.get().query('SELECT project_id as id, title, subtitle, imageUri FROM cf_projects', function (err, rows) {
        if (err) return done({"ERROR": "Error selecting"});
        return done(rows);
    });
};

// recheck
exports.insertProject = function (user_data, done) {
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
        if (err) console.log(err);
        if (err) return done(false);
        project_rows = rows[0];
        if (perform_done()) return perform_done();
    });

    db.get().query('SELECT user_id as id, name FROM cf_creators WHERE project_id=?', project_id, function (err, rows) {
        if (err) console.log(err);
        if (err) return done(false);
        creators_row = rows;
        if (perform_done()) return perform_done();
    });

    db.get().query('SELECT reward_id as id, amount, description FROM cf_rewards WHERE project_id=?', project_id, function (err, rows) {
        if (err) console.log(err);
        if (err) return done(false);
        rewards_row = rows;
        if (perform_done()) return perform_done();
    });

    db.get().query('SELECT COALESCE(SUM(amount), 0) as currentPledged, COUNT(*) as numberOfBackers FROM cf_backers WHERE project_id=?', project_id, function (err, rows) {
        if (err) console.log(err);
        if (err) return done(false);
        backers_row_progress = rows[0];
        if (perform_done()) return perform_done();
    });

    db.get().query('SELECT user_id as name, amount FROM cf_backers WHERE project_id=?', project_id, function (err, rows) {
        if (err) console.log(err);
        if (err) return done(false);
        backers_row = rows;
        if (perform_done()) return perform_done();
    });

    function finish_function() {
        // console.log(project_rows);
        // console.log(creators_row);
        // console.log(rewards_row);
        // console.log(backers_row);
        // console.log(backers_row_progress);

        return done({
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
                "currentPledged": backers_row_progress.currentPledged ,
                "numberOfBackers": backers_row_progress.numberOfBackers
            },
            "backers": backers_row
        });
    }

    function perform_done() {
        if (project_rows && creators_row && rewards_row && backers_row && backers_row_progress) {
            return finish_function();
        }
    }
};

// assume
exports.getImg = function (project_id, done) {
    db.get().query('SELECT imageUri FROM cf_projects WHERE project_id=?', project_id, function (err, rows) {
        if (err) return done({"error": "error"});
        done({"imageUri": rows[0].imageUri})  // NOT IN SPEC
    });
};

exports.alter = function () {
    return null;
};

exports.remove = function () {
    return null;
};

// assume
exports.updateProject = function (project_id, project_status, done) {
  db.get().query('UPDATE cf_projects SET open_project=? WHERE project_id=?', [project_status, project_id], function (err, rows) {
      if (err) return done({"error": "error"});
      done(rows);  // NOT IN SPEC
  })
};

// assume
exports.updateImg = function (project_id, image, done) {
    db.get().query('UPDATE cf_projects SET imageUri=? WHERE project_id=?', [image, project_id], function (err, rows) {
        if (err) return done({"error": "error"});
        done(rows);  // NOT IN SPEC
    })
};

// done-ish (auth)
exports.pledge = function (project_id, pledge_data, done) {
    let id = pledge_data['id'];
    let amount = pledge_data['amount'];
    let anonymous = pledge_data['anonymous'];
    let authToken = pledge_data['card']['authToken'];

    db.get().query('SELECT project_id FROM cf_projects WHERE project_id=?', project_id, function (err, project_lookup_result) {
        if (err) return done("error");
        if (project_lookup_result.length < 1) {
            return done("project not found");
        } else {
            let creators_id = [];
            db.get().query('SELECT user_id FROM cf_creators WHERE project_id=?', project_id, function (err, get_creators_id_result) {
                if (err) return done("error");
                for (let creator_id of get_creators_id_result) {
                    creators_id.push(creator_id['user_id'])
                }
                if (id in creators_id) {
                    return done("is creator");
                }

                let values = [id, amount, anonymous, authToken, project_id];
                db.get().query('INSERT INTO cf_backers (user_id, amount, anonymous, authToken, project_id) VALUES (?, ?, ?, ?, ?)', values, function (err, rows) {
                    if (err) return done("error");
                    done("ok");  // NOT IN SPEC
                })
            });
        }
    });
};