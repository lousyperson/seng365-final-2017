const db = require('../../config/db.js');

// done
exports.insert = function (user_data, done) {
    function insert_creator(element, index, array) {
        let project_id = user_data['project_id'];
        let reward_id = element['id'];
        let amount = element['amount'];
        let description = element['description'];

        let values = [project_id, reward_id, amount, description];

        db.get().query('INSERT INTO cf_rewards (project_id, reward_id, amount, description) VALUES (?, ?, ?, ?)', values, function (err, result) {
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
    db.get().query('SELECT rewards_id as id, amount, description FROM cf_rewards WHERE project_id=?', [project_id], function (err, result) {
        if (result.length > 0) {
            return done(result)
        } else {
            return done()
        }
    });
};

// assume
exports.updateReward = function (update_data, auth_user_id, done) {
    let project_id;
    let amount;
    let description;
    try {
        project_id = update_data['project_id'];
        amount = update_data['amount'];
        description = update_data['description'].toString();
    } catch (err) {
        if (err instanceof TypeError) {
            return done("error");
        }
    }

    db.get().query('SELECT rewards_id FROM cf_rewards WHERE project_id=?', project_id, function (err, check_reward_exists_rows) {
        if (err) return done("error");
        if (check_reward_exists_rows.length < 1) return done("not found");
        else {
            let creators_list = [];
            db.get().query('SELECT user_id FROM cf_creators WHERE project_id=?', project_id, function (err, check_creator_rows) {
                if (err) return done("error");
                for (let creator of check_creator_rows) {
                    creators_list.push(creator);
                }
                if (creators_list.indexOf(auth_user_id) === -1) return done("not project");

                let values = [amount, description, project_id];
                db.get().query('UPDATE cf_rewards SET amount=?, description=? WHERE project_id=?', values, function (err, result) {
                    if (err) return done("error");
                    if (result.affectedRows === 1)  return done("ok");
                    else return done("error");
                })
            })
        }
    })
};