const Project = require('../models/project.server.model');
const Reward = require('../models/reward.server.model');
const Creator = require('../models/creator.server.model');
const AuthMiddleware = require('../models/authMiddleware');

const fs = require('fs');
const multer = require('multer');

// done
exports.listProjects = function (req, res) {
    Project.getAll(function (result) {
        res.statusMessage = "OK";
        res.status(200);
        res.json(result);
        res.end();
    });
};

// done
exports.createProject = function (req, res) {
    let auth_user_id;

    AuthMiddleware.checkAuth(req, function (done) {
        if (done === "not log in" || done === "no account") {
            res.statusMessage = "Unauthorized - create account to create project";
            res.status(401);
            res.json(0);
            res.end();
        } else {
            auth_user_id = done;
            insert_project();
        }
    });

    function insert_creator(project_id) {
        let creators_data = {
            "creators": req.body.creators
        };

        Creator.insert(creators_data, auth_user_id, project_id, function (result) {

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

    function insert_project() {
        let project_data = {
            "title": req.body.title,
            "subtitle": req.body.subtitle,
            "description": req.body.description,
            "imageUri": req.body.imageUri,
            "target": req.body.target
        };

        Project.insertProject(project_data, function (result) {
            if (result === "error") {
                res.statusMessage = "Malformed project data";
                res.status(400);
                res.json(0);
                res.end();
                return;
            }
            let project_id = result.insertId;
            if (project_id !== undefined) {
                insert_creator(project_id);
                insert_reward(project_id);
            }

            if (result.affectedRows === 1) {
                res.statusMessage = "OK";
                res.status(200);
                res.json(project_id);
                res.end();
            } else {
                res.statusMessage = "Malformed project data";
                res.status(400);
                res.json(0);
                res.end();
            }
        });
    }
};

// done
exports.getOne = function (req, res) {
    let project_id = Number(req.params.id);

    if (!(project_id >= 0)) {
        res.statusMessage = "Project not found";
        res.status(404);
        res.json({});
        res.end();
        return;
    }

    Project.getOne(project_id, function (result) {
        if (result === "error") {
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

// done
exports.getImg = function (req, res) {
    let project_id = Number(req.params.id);

    if (!(project_id >= 0)) {
        res.statusMessage = "Malformed request";
        res.status(400);
        res.end();
        return;
    }

    Project.getImg(project_id, function (result) {
        if (result === "error") {
            res.statusMessage = "Not found";
            res.status(404);
            res.end();
        } else {
            res.statusMessage = "OK";
            res.status(200);
            res.end(result, 'binary');
        }
    })
};

// done
exports.updateProject = function (req, res) {
    let auth_user_id;
    AuthMiddleware.checkAuth(req, function (done) {
        if (done === "not log in" || done === "no account") {
            res.statusMessage = "Unauthorized - create account to update project";
            res.status(401);
            res.end();
            return;
        }
        auth_user_id = Number(done);
        update_project();
    });

    function update_project() {
        let project_id = Number(req.params.id);
        let project_status;
        try {
            project_status = req.body.open.toString();
        } catch (err) {
            if (err instanceof TypeError) {
                res.statusMessage = "Malformed request";
                res.status(400);
                res.end();
            }
        }

        if ((project_status === 'true' || project_status === 'false') && project_id >= 0) {
            Project.updateProject(project_id, project_status, auth_user_id, function (result) {
                if (result === "ok") {
                    res.statusMessage = "OK";
                    res.status(200);
                    res.end();
                } else if (result === "not creator") {
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
        } else {
            res.statusMessage = "Malformed request";
            res.status(400);
            res.end();
        }
    }
};

// done
exports.updateImg = function (req, res) {
    let auth_user_id;
    AuthMiddleware.checkAuth(req, function (done) {
        if (done === "not log in" || done === "no account") {
            res.statusMessage = "Unauthorized - create account to update project";
            res.status(401);
            res.end();
            return;
        }
        auth_user_id = Number(done);
        update_image();
    });

    function update_image() {
        let path = require('path');

        let upload = multer({
            storage: multer.memoryStorage(),
            fileFilter: function(req, file, callback) {
                let ext = path.extname(file.originalname);
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                    return callback("error", null)
                }
                callback(null, true)
            }
        }).single('avatar');

        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                res.statusMessage = "Malformed request";
                res.status(400);
                res.end();
            } else {
                let project_id = Number(req.params.id);
                if (!(project_id >= 0)) {
                    res.statusMessage = "Not found";
                    res.status(404);
                    res.end();
                    return;
                }

                let buffer = req.file.buffer;
                let filename = req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname);
                fs.writeFile('./uploads/' + filename, buffer, 'binary', function(err) {
                    if (err) {
                        console.log(err);
                        res.statusMessage = "Malformed request";
                        res.status(400);
                        res.end();
                        return;
                    }
                    Project.updateImg(project_id, buffer, auth_user_id, function (result) {
                        if (result === "ok") {
                            res.statusMessage = "OK";
                            res.status(200);
                            res.end();
                        } else if (result === "not creator") {
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
                });
            }
        });
    }
};

exports.delete = function (req, res) {
    return null;
};

exports.userById = function (req, res) {
    return null;
};

// done
exports.pledge = function (req, res) {
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
            res.statusMessage = "Unauthorized - create account to pledge to a project";
            res.status(401);
            res.end();
        } else {
            auth_user_id = Number(done);
            pledge_function();
        }
    });

    function pledge_function() {
        let pledge_data = {
            "id": auth_user_id,
            "amount": req.body.amount,
            "anonymous": req.body.anonymous,
            "card": {
                "authToken": req.body.card.authToken
            }
        };

        if (typeof pledge_data['anonymous'] !== "boolean" || !(Number(pledge_data["amount"]) >= 0)) {
            res.statusMessage = "bad user, project, or pledge details";
            res.status(400);
            res.end();
            return;
        }

        Project.pledge(project_id, pledge_data, function (result) {
            if (result === "error") {
                res.statusMessage = "Bad user, project, or pledge details";
                res.status(400);
                res.end();
            } else if (result === "is creator") {
                res.statusMessage = "Forbidden - cannot pledge to own project - this is fraud!";
                res.status(403);
                res.end();
            } else if (result === "project not found"){
                res.statusMessage = "Not found";
                res.status(404);
                res.end();
            } else if (result === "ok") {
                res.statusMessage = "OK";
                res.status(200);
                res.end();
            } else {
                res.statusMessage = "Bad user, project, or pledge details";
                res.status(400);
                res.end();
            }
        })
    }
};