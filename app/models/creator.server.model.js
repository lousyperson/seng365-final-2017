const db = require('../../config/db.js');

// done-ish
exports.insert = function (user_data, auth_user_id, done) {
    function insert_creator(element, index, array) {
        let project_id = user_data['project_id'];
        let user_id = element['id'];
        let name = auth_user_id;

        if (index === 0) {
            user_id = auth_user_id;
        }

        let values = [project_id, user_id, name];

        db.get().query('INSERT INTO cf_creators (project_id, user_id, name) VALUES (?, ?, ?)', values, function (err, result) {
            // console.log(result)
            // if (err) return done(err);
            //
            // done(result);
        });
    }

    if (user_data['creators'] !== undefined) {
        // console.log(user_data['creators']);
        user_data['creators'].forEach(insert_creator);
    }

    done()
};

// testing use
exports.getAll = function (done) {
    db.get().query('SELECT * FROM cf_creators', function (err, rows) {
        if (err) return done({"ERROR": "Error selecting"});

        return done(rows);
    });
};