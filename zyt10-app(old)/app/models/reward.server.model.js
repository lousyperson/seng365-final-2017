const db = require('../../config/db.js');

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

exports.getAll = function (project_id, done) {
    db.get().query('SELECT reward_id as id, amount, description FROM cf_rewards WHERE project_id=?', [project_id], function (err, result) {
        if (err) { console.log(err); return done("error"); }
        if (result.length < 1) return done("error");
        else return done(result);
    });
};

exports.updateReward = function (update_data, auth_user_id, project_id, done) {
    db.get().query('SELECT COUNT(*) AS count FROM cf_projects WHERE project_id=?', project_id, function (err, check_project_exists_rows) {
        if (err) { console.log(err); return done("error"); }
        if (check_project_exists_rows[0].count === 0) return done("not found");

        let creators_list = [];
        db.get().query('SELECT user_id FROM cf_creators WHERE project_id=?', project_id, function (err, check_creator_rows_sql) {
            if (err) { console.log(err); return done("error"); }
            let check_creator_rows = JSON.parse(JSON.stringify(check_creator_rows_sql));
            for (let creator of check_creator_rows) {
                creators_list.push(creator);
            }
            let is_creator = false;
            creators_list.filter(function (item) {
                if (item.user_id === auth_user_id) {
                    is_creator = true;
                }
            });
            if (!is_creator) return done("not project");

            db.get().query('DELETE FROM cf_rewards WHERE project_id=?', project_id, function (err, delete_old_rewards_rows) {
                if (err) { console.log(err); return done("error"); }
                return update_data.forEach(each_item_in_array)
            });
        });
    });

    function each_item_in_array(element, index, array) {
        let amount;
        let description;
        let reward_id = index + 1;
        try {
            amount = Number(element['amount']);
            if (!(amount >= 0)) { return done("error"); }
            description = element['description'].toString();
        } catch (err) {
            if (err instanceof TypeError) {
                return done("error");
            }
        }

        let values = [project_id, reward_id, amount, description];
        db.get().query('INSERT INTO cf_rewards (project_id, reward_id, amount, description) VALUES (?, ?, ?, ?)', values, function (err, result) {
            if (err) return done("error");
            if (result.affectedRows === 0)  return done("error");
            if (index === array.length - 1) return done("ok");
        })
    }
};