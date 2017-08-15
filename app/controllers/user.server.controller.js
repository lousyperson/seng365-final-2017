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
        res.json(result);
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

exports.userById = function (req, res) {
    return null;
};