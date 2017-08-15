const Reward = require('../models/reward.server.model');

// done-ish
exports.list = function (req, res) {
    let project_id = req.params.id;
    Reward.getAll(project_id, function (result) {
        if (result) {
            res.statusMessage = "OK";
            res.status(200);
            res.json(result);
            res.end();
        } else {
            res.statusMessage = "Not found";
            res.status(404);
            res.json([]);
            res.end();
        }
    })
};

// done-ish (auth)
exports.update = function (req, res) {
    // if (NOT LOGIN) {
    //     res.statusMessage = "Unauthorized - create account to update project";
    //     res.status(401);
    //     res.end();
    // } else if (NOT LOGIN USER PROJECT) {
    //     res.statusMessage = "Forbidden - unable to update a project you do not own";
    //     res.status(403);
    //     res.end();
    // }

    let update_data = {
        "project_id": req.params.id,
        "amount": req.body[0].amount,
        "description": req.body[0].description
    };

    Reward.update(update_data, function (result) {
        if (result['ok']) {
            res.statusMessage = "OK";
            res.status(201);
            res.end();
        } else if (result['notfound']) {
            res.statusMessage = "Not found";
            res.status(404);
            res.end();
        } else {
            res.statusMessage = "Malformed request";
            res.status(400);
            res.end();
        }
    })
};