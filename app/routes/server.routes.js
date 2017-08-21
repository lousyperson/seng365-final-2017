const projects = require('../controllers/project.server.controller');
const rewards = require('../controllers/reward.server.controller');
const users = require('../controllers/user.server.controller');

const basePath = "/api/v1";

// ------TESTING PURPOSE------
function testing(req, res) {
    const db = require('../../config/db.js');
    db.get().query('show tables;', function (err, rows) {
        res.json(rows);
    });
}
// ---------------------------

module.exports = function (app) {
    app.route(basePath + "/")
        .get(testing);

    app.route(basePath + '/projects')
        .get(projects.listProjects)
        .post(projects.createProject);

    app.route(basePath + '/projects/:id')
        .get(projects.getOne)
        .put(projects.updateProject);

    app.route(basePath + '/projects/:id/image')
        .get(projects.getImg)
        .put(projects.updateImg);

    app.route(basePath + '/projects/:id/pledge')
        .post(projects.pledge);

    app.route(basePath + '/projects/:id/rewards')
        .get(rewards.listRewards)
        .put(rewards.updateReward);

    app.route(basePath + '/users')
        .post(users.createUser);

    app.route(basePath + '/users/login')
        .post(users.login);

    app.route(basePath + '/users/logout')
        .post(users.logout);

    app.route(basePath + '/users/:id')
        .get(users.userById)
        .put(users.updateUser)
        .delete(users.deleteUser)
};