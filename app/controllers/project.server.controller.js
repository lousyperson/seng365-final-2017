const Project = require('../models/project.server.model');
const Reward = require('../models/reward.server.model');
const Creator = require('../models/creator.server.model');

// done
exports.list = function (req, res) {
    Project.getAll(function (result) {
        res.statusMessage = "OK";
        res.status(200);
        res.json(result);
        res.end();
    });
};

// done-ish (auth)
exports.create = function (req, res) {
    // if (NOT AUTHORISED) {
    //     res.statusMessage = "Unauthorized - create account to create project";
    //     res.status(401);
    //     res.json(0);
    //     res.end();
    // }

    let project_data = {
        "title": req.body.title,
        "subtitle": req.body.subtitle,
        "description": req.body.description,
        "imageUri": req.body.imageUri,
        "target": req.body.target
    };

    Project.insert(project_data, function (result) {
        // console.log(JSON.stringify(result));
        let project_id = result.insertId;
        if (project_id !== undefined) {
            insert_creator(project_id);
            insert_reward(project_id);
        }

        if (result.affectedRows === 1) {
            res.statusMessage = "OK";
            res.status(200);
            res.json(1);
            res.end();
        } else {
            res.statusMessage = "Malformed project data";
            res.status(400);
            res.json(0);
            res.end();
        }
    });

    function insert_creator(project_id) {
        let creators_data = {
            "creators": req.body.creators,
            "project_id": project_id
        };

        Creator.insert(creators_data, function (result) {

        });
    }

    function insert_reward(project_id) {
        let rewards_data = {
            "rewards": req.body.rewards,
            "project_id": project_id
        };

        Reward.insert(rewards_data, function (result) {

        });
    }
};

// assume
exports.read = function (req, res) {
    let project_id = req.params.id;
    Project.getOne(project_id, function (result) {
        if (result.error) {  // NOT IN SPEC
            res.statusMessage = "Project not found";
            res.status(404);
            res.json({});
            res.end();
        } else {
            res.statusMessage = "OK";
            res.status(200);
            res.json(result);
            res.end();
        }
    });
};

// assume
exports.showImg = function (req, res) {
    let project_id = req.params.id;
    Project.getImg(project_id, function (result) {
        if (result.error) {  // NOT IN SPEC
            res.statusMessage = "Project not found";
            res.status(404);
            res.end();
        } else {
            res.statusMessage = "OK";
            res.status(200);
            res.end();
        }
    })
};

// assume
exports.update = function (req, res) {
    // if (NOT LOGIN) {
    //     res.statusMessage = "Unauthorized - create account to update project";
    //     res.status(401);
    //     res.end();
    // } else if (NOT USER PROJECT) {
    //     res.statusMessage = "Forbidden - unable to update a project you do not own";
    //     res.status(403);
    //     res.end();
    // }

    let project_id = req.params.id;
    let project_status = req.body.open.toLowerCase();

    if (project_status !== "true" || project_status !== "false") {
        res.statusMessage = "Malformed request";
        res.status(400);
        res.end();
        return;
    }

    Project.updateProject(project_id, project_status, function (result) {
        if (result.affectedRows === 1) {
            res.statusMessage = "OK";
            res.status(200);
            res.end();
        } else {
            res.statusMessage = "Malformed request";
            res.status(400);
            res.end();
        }
    })
};

// assume
exports.updateImg = function (req, res) {
    // if (NOT LOGIN) {
    //     res.statusMessage = "Unauthorized - create account to update project";
    //     res.status(401);
    //     res.end();
    // } else if (NOT USER PROJECT) {
    //     res.statusMessage = "Forbidden - unable to update a project you do not own";
    //     res.status(403);
    //     res.end();
    // }

    let project_id = req.params.id;
    let image = req.body.image;

    Project.updateImg(project_id, image, function (result) {
        if (result.affectedRows === 1) {
            res.statusMessage = "OK";
            res.status(200);
            res.end();
        } else {
            res.statusMessage = "Malformed request";
            res.status(400);
            res.end();
        }
    })
};

exports.delete = function (req, res) {
    return null;
};

exports.userById = function (req, res) {
    return null;
};