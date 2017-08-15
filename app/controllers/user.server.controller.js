const User = require('../models/user.server.model');

exports.list = function (req, res) {
    User.getAll(function (result) {
        res.json(result);
    });
};

// done-ish
exports.create = function (req, res) {
    let user = {
        "id": req.body.user.id,
        "username": req.body.user.username,
        "location": req.body.user.location,
        "email": req.body.user.email,
    };

    let password = req.body.password;

    User.insert(user, password, function (result) {
        if (result.error) {
            res.sendStatus(400)
        } else {
            res.json(1);
        }
    });
};

// done-ish
exports.login = function (req, res) {
    let login_details = {
        "username": req.body.username,
        "password": req.body.password
    };

    User.login(login_details, function (result) {
        if (result.error) {
            res.sendStatus(400)
        } else {
            res.json(result);
        }
    });
};

exports.read = function (req, res) {
    let id = req.params.userId;
    User.getOne(id, function (result) {
        res.json(result);
    });
};

exports.update = function (req, res) {
    return null;
};

exports.delete = function (req, res) {
    return null;
};

// done-ish
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
        if (result.length === 1) {
            res.statusMessage = "OK";
            res.status(200);
            res.json(result[0]);
            res.end();
        } else {
            res.statusMessage = "User not found";
            res.status(404);
            res.json({});
            res.end();
        }
    })
};