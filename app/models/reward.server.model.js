const db = require('../../config/db.js');

// done-ish
exports.insert = function (user_data, done) {
    function insert_creator(element, index, array) {
        let project_id = user_data['project_id'];
        let reward_id = element['id'];
        let amount = element['amount'];
        let description = element['description'];

        let values = [project_id, reward_id, amount, description];

        db.get().query('INSERT INTO rewards (project_id, reward_id, amount, description) VALUES (?, ?, ?, ?)', values, function (err, result) {
            // console.log(result)
            // if (err) return done(err);
            //
            // done(result);
        });
    }

    if (user_data['rewards'] !== undefined) {
        // console.log(user_data['rewards']);
        user_data['rewards'].forEach(insert_creator);
    }

    done()
};

// done-ish
exports.getAll = function (project_id, done) {
    db.get().query('SELECT rewards_id as id, amount, description FROM rewards WHERE project_id=?', [project_id], function (err, result) {
        if (result.length > 0) {
            return done(result)
        } else {
            return done()
        }
    });
};