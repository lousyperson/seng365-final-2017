const db = require('../../config/db.js');

exports.getAll = function (done) {
    db.get().query('SELECT project_id as id, title, subtitle, imageUri FROM cf_projects', function (err, rows) {
        if (err) { console.log(err); return done([]); }
        return done(rows);
    });
};

exports.insertProject = function (user_data, done) {
    let title;
    let subtitle;
    let description;
    let imageUri;
    let target;
    try {
        title = user_data['title'].toString();
        subtitle = user_data['subtitle'].toString();
        description = user_data['description'].toString();
        imageUri = user_data['imageUri'].toString();
        target = user_data['target'];
    } catch (err) {
        if (err instanceof TypeError) {
            return done("error");
        }
    }

    let values = [title, subtitle, description, imageUri, target];

    db.get().query('INSERT INTO cf_projects (title, subtitle, description, imageUri, target) VALUES (?, ?, ?, ?, ?)', values, function (err, result) {
        if (err) { console.log(err); return done("error"); }
        if (result.affectedRows === 1) return done(result);
        else return done("error");
    });
};

exports.getOne = function (proj_id, done) {
    let project_id = proj_id;
    let project_rows;
    let creators_row;
    let rewards_row;
    let backers_row;
    let backers_row_progress;

    let already_return = false;

    db.get().query('SELECT DATE_FORMAT(creation_date, "%d-%m-%Y %T") as creationDate, title, subtitle, description, imageUri, target FROM cf_projects WHERE project_id=?', project_id, function (err, rows) {
        if (!already_return) {
            if (err) { console.log(err); already_return=true; return done("error"); }
            if (rows.length < 1) { already_return=true; return done("error"); }
            project_rows = rows[0];
            if (perform_done()) return perform_done();
        }
    });

    db.get().query('SELECT user_id as id, name FROM cf_creators WHERE project_id=? ORDER BY user_id', project_id, function (err, rows) {
        if (!already_return) {
            if (err) { console.log(err); already_return=true; return done("error"); }
            if (rows.length < 1) { already_return=true; return done("error"); }
            creators_row = rows;
            if (perform_done()) return perform_done();
        }
    });

    db.get().query('SELECT reward_id as id, amount, description FROM cf_rewards WHERE project_id=? ORDER BY reward_id', project_id, function (err, rows) {
        if (!already_return) {
            if (err) { console.log(err); already_return=true; return done("error"); }
            rewards_row = rows;
            if (perform_done()) return perform_done();
        }
    });

    db.get().query('SELECT COALESCE(SUM(amount), 0) as currentPledged, COUNT(*) as numberOfBackers FROM cf_backers WHERE project_id=?', project_id, function (err, rows) {
        if (!already_return) {
            if (err) { console.log(err); already_return=true; return done("error"); }
            backers_row_progress = rows[0];
            if (perform_done()) return perform_done();
        }
    });

    db.get().query('SELECT user_id as name, amount FROM cf_backers WHERE project_id=?', project_id, function (err, rows) {
        if (!already_return) {
            if (err) { console.log(err); already_return=true; return done("error"); }
            backers_row = rows;
            if (perform_done()) return perform_done();
        }
    });

    function finish_function() {
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

exports.getImg = function (project_id, done) {
    db.get().query('SELECT imageUri FROM cf_projects WHERE project_id=?', project_id, function (err, rows) {
        if (err) { console.log(err); return done("error"); }
        if (rows.length < 1) return done("error");
        if (rows[0].imageUri === undefined) return done("error");
        else return done(rows[0].imageUri);
    });
};

exports.updateProject = function (project_id, project_status, id, done) {
    db.get().query('SELECT COUNT(*) AS count FROM cf_projects WHERE project_id=?', project_id, function (err, project_lookup_result) {
        if (err) { console.log(err); return done("error"); }
        if (project_lookup_result[0].count === 0) { return done("not found"); }

        let creators_id = [];
        db.get().query('SELECT user_id FROM cf_creators WHERE project_id=?', project_id, function (err, get_creators_id_result) {
            if (err) { console.log(err); return done("error"); }
            for (let creator_id of get_creators_id_result) { creators_id.push(creator_id['user_id']) }
            if (!(creators_id.indexOf(id) >= 0)) { return done("not creator"); }

            db.get().query('UPDATE cf_projects SET open_project=? WHERE project_id=?', [project_status, project_id], function (err, rows) {
                if (err) { console.log(err); return done("error"); }
                done("ok");
            })
        })
    })
};

exports.updateImg = function (project_id, image, id, done) {
    db.get().query('SELECT COUNT(*) AS count FROM cf_projects WHERE project_id=?', project_id, function (err, project_lookup_result) {
        if (err) { console.log(err); return done("error"); }
        if (project_lookup_result[0].count === 0) { return done("not found"); }

        let creators_id = [];
        db.get().query('SELECT user_id FROM cf_creators WHERE project_id=?', project_id, function (err, get_creators_id_result) {
            if (err) { console.log(err); return done("error"); }
            for (let creator_id of get_creators_id_result) { creators_id.push(creator_id['user_id']) }
            if (!(creators_id.indexOf(id) >= 0)) { return done("not creator"); }

            db.get().query('UPDATE cf_projects SET imageUri=? WHERE project_id=?', [image, project_id], function (err, rows) {
                if (err) { console.log(err); return done("error"); }
                done("ok");
            })
        })
    });
};

exports.pledge = function (project_id, pledge_data, done) {
    let id;
    let amount;
    let anonymous;
    let authToken;
    try {
        id = pledge_data['id'];
        amount = pledge_data['amount'];
        anonymous = pledge_data['anonymous'];
        authToken = pledge_data['card']['authToken'].toString();
    } catch (err) {
        if (err instanceof TypeError) return done("error");
    }

    db.get().query('SELECT COUNT(*) AS count FROM cf_projects WHERE project_id=?', project_id, function (err, project_lookup_result) {
        if (err) { console.log(err); return done("error"); }
        if (project_lookup_result[0].count === 0) {
            return done("project not found");
        } else {
            let creators_id = [];
            db.get().query('SELECT user_id FROM cf_creators WHERE project_id=?', project_id, function (err, get_creators_id_result) {
                if (err) { console.log(err); return done("error"); }
                for (let creator_id of get_creators_id_result) {
                    creators_id.push(creator_id['user_id'])
                }

                if (creators_id.indexOf(id) >= 0) {
                    return done("is creator");
                }

                let values = [id, amount, anonymous, authToken, project_id];
                db.get().query('INSERT INTO cf_backers (user_id, amount, anonymous, authToken, project_id) VALUES (?, ?, ?, ?, ?)', values, function (err, rows) {
                    if (err) { console.log(err); return done("error"); }
                    done("ok");
                })
            });
        }
    });
};