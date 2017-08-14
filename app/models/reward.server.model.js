const db = require('../../config/db.js');

// done-ish
exports.insert = function (user_data, done) {
    function insert_creator(element, index, array) {
        let project_id = user_data['project_id'];
        let reward_id = element['id'];
        let amount = element['amount'];
        let description = element['description'];

        let values = [project_id, reward_id, amount, description];
        console.log("reward " + values);

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

// testing use
exports.getAll = function (done) {
    db.get().query('SELECT * FROM rewards', function (err, rows) {
        if (err) return done({"ERROR": "Error selecting"});

        return done(rows);
    });
};