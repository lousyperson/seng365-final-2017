const Reward = require('../models/reward.server.model');
const AuthMiddleware = require('../models/authMiddleware');

// done
exports.listRewards = function (req, res) {
    let project_id = Number(req.params.id);

    if (!(project_id >= 0)) {
        res.statusMessage = "Not found";
        res.status(404);
        res.json([]);
        res.end();
        return;
    }

    Reward.getAll(project_id, function (result) {
        if (result === "error") {
            res.statusMessage = "Not found";
            res.status(404);
            res.json([]);
            res.end();
        } else {
            res.statusMessage = "OK";
            res.status(200);
            res.json(result);
            res.end();
        }
    })
};

// done
exports.updateReward = function (req, res) {
    let auth_user_id;
    let project_id = Number(req.params.id);

    if (!(project_id >= 0)) {
        res.statusMessage = "Not found";
        res.status(404);
        res.end();
        return;
    }

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
        let update_data = [];
        for (let key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                let item = req.body[key];
                update_data.push(item);
            }
        }

        Reward.updateReward(update_data, auth_user_id, project_id, function (result) {
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