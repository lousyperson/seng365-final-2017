const Reward = require('../models/reward.server.model');
const AuthMiddleware = require('../models/authMiddleware');

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

// assume
exports.updateReward = function (req, res) {
    let auth_user_id;

    AuthMiddleware.checkAuth(req, function (done) {
        if (done === "not log in" || done === "no account") {
            res.statusMessage = "Unauthorized - create account to update project";
            res.status(401);
            res.end();
        } else {
            auth_user_id = Number(done);
            update_reward();
        }
    });

    function update_reward() {
        let update_data = {
            "project_id": req.params.id,
            "amount": req.body[0].amount,
            "description": req.body[0].description
        };

        Reward.updateReward(update_data, auth_user_id, function (result) {
            if (result === "ok") {
                res.statusMessage = "OK";
                res.status(201);
                res.end();
            } else if (result === "error") {
                res.statusMessage = "Malformed request";
                res.status(400);
                res.end();
            } else if (result === "not project") {
                res.statusMessage = "Forbidden - unable to update a project you do not own";
                res.status(403);
                res.end();
            } else if (result === "not found") {
                res.statusMessage = "Not found";
                res.status(404);
                res.end();
            } else {
                res.statusMessage = "Malformed request";
                res.status(400);
                res.end();
            }
        })
    }
};