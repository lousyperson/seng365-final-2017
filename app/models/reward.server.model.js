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

// done-ish (auth)
exports.update = function (update_data, done) {
    let project_id = update_data['project_id'];
    let amount = update_data['amount'];
    let description = update_data['description'].toString();

    let values = [amount, description, project_id];

    db.get().query('UPDATE rewards SET amount=?, description=? WHERE project_id=?', values, function (err, result) {
        // if (err) console.log(err);
        // if (result) console.log(result);
        if (err) {
            return done({"malformed": "malformed"})
        }
        if (result.affectedRows === 1) {
            return done({"ok": "ok"})
        } else if (result.affectedRows < 1) {
            return done({"notfound": "not found"})
        } else {
            return done({"malformed": "malformed"})
        }
    })
};