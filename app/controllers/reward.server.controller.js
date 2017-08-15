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