const Project = require('../models/project.server.model');
const Reward = require('../models/reward.server.model');
const Creator = require('../models/creator.server.model');

// done
exports.list = function (req, res) {
    Project.getAll(function (result) {
        res.json(result);
    });
};

// done-ish
exports.create = function (req, res) {
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
        insert_creator(project_id);
        insert_reward(project_id);
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

    Project.getAll(function (result) {
        res.json(result);
    });
};

exports.read = function (req, res) {
    let id = req.params.userId;
    Project.getOne(id, function (result) {
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