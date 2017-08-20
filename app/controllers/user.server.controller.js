const User = require('../models/user.server.model');
const AuthMiddleware = require('../models/authMiddleware');

exports.list = function (req, res) {
    User.getAll(function (result) {
        res.json(result);
    });
};

// done
exports.createUser = function (req, res) {
    let user_data = {
        "id": req.body.user.id,
        "username": req.body.user.username,
        "location": req.body.user.location,
        "email": req.body.user.email,
    };

    let password = req.body.password;

    User.insertUser(user_data, password, function (result) {
        if (result === "error") {
            res.statusMessage = "Malformed request";
            res.status(400);
            res.json(0);
            res.end();
        } else {
            res.statusMessage = "OK";
            res.status(201);
            res.json(result);
            res.end();
        }
    });
};

// done
exports.login = function (req, res) {
    let login_details = {
        "username": req.body.username,
        "password": req.body.password
    };

    User.login(login_details, function (result) {
        if (result === "error") {
            res.statusMessage = "Invalid username/password supplied";
            res.status(400);
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

exports.read = function (req, res) {
    let id = req.params.userId;
    User.getOne(id, function (result) {
        res.json(result);
    });
};

// done
exports.updateUser = function (req, res) {
    let auth_user_id;

    AuthMiddleware.checkAuth(req, function (done) {
        if (done === "not log in" || done === "no account") {
            res.statusMessage = "Unauthorized - not logged in";
            res.status(401);
            res.end();
        } else {
            auth_user_id = Number(done);
            if (auth_user_id !== Number(req.params.id)) {
                res.statusMessage = "Forbidden - account not owned";
                res.status(403);
                res.end();
                return;
            }
            update_user();
        }
    });

    function update_user() {
        let update_data = {
            "user": {
                "id": auth_user_id,
                "username": req.body.user.username,
                "location": req.body.user.location,
                "email": req.body.user.email
            },
            "password": req.body.password
        };

        User.updateUser(update_data, function (result) {
            if (result === "ok") {  // NOT IN SPEC
                res.statusMessage = "OK";
                res.status(200);
                res.end();
            } else if (result === "not found") {
                res.statusMessage = "User not found";
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

// assume
exports.deleteUser = function (req, res) {
    let auth_user_id;

    AuthMiddleware.checkAuth(req, function (result) {
        if (result === "not log in" || result === "no account") {
            res.statusMessage = "Unauthorized - not logged in";
            res.status(400);
            res.end();
        } else {
            auth_user_id = Number(result);
            if (auth_user_id !== Number(req.params.id)) {
                res.statusMessage = "Forbidden - account not owned";
                res.status(403);
                res.end();
                return;
            }
            delete_user();
        }
    });

    function delete_user() {
        User.deleteUser(auth_user_id, function (result) {
            if (result === "ok") {
                res.statusMessage = "User deleted";
                res.status(200);
                res.end();
            } else {
                res.statusMessage = "User not found";
                res.status(404);
                res.end();
            }
        })
    }
};

// done
exports.userById = function (req, res) {
    let userId = Number(req.params.id);

    if (!(userId >= 1)) {
        res.statusMessage = "Invalid id supplied";
        res.status(400);
        res.json({});
        res.end();
        return;
    }

    User.getOne(userId, function (result) {
        if (result === "error") {
            res.statusMessage = "Invalid id supplied";
            res.status(400);
            res.json({});
            res.end();
        } else if (result.length < 1) {
            res.statusMessage = "User not found";
            res.status(404);
            res.json({});
            res.end();
        } else  {
            res.statusMessage = "OK";
            res.status(200);
            res.json(result[0]);
            res.end();
        }
    })
};

// done
exports.logout = function (req, res) {
    AuthMiddleware.logout(req, function (done) {
        if (done === "ok") {
            res.statusMessage = "OK";
            res.status(200);
            res.end();
        } else {
            res.statusMessage = "Unauthorized - already logged out";
            res.status(401);
            res.end();
        }
    })
};