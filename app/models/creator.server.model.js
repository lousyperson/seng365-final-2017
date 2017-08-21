const db = require('../../config/db.js');

exports.insert = function (user_data, auth_user_id, project_id, done) {
    function insert_creator(element, index, array) {
        let user_id = element['id'];

        if (index === 0) {
            user_id = auth_user_id;
        }

        let values = [project_id, user_id, user_id];
        db.get().query('INSERT INTO cf_creators (project_id, user_id, name) VALUES (?, ?, ?)', values, function (err, result) {
            if (err) { console.log(err); return done("error") }
        });
    }

    if (user_data['creators'] !== undefined) {
        if (user_data['creators'].length > 0) {
            user_data['creators'].forEach(insert_creator);
        } else {
            [{
                "id": auth_user_id
            }].forEach(insert_creator);
        }
    } else {
        [{
            "id": auth_user_id
        }].forEach(insert_creator);
    }
    done()
};