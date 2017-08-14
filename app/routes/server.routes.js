const projects = require('../controllers/project.server.controller');
const rewards = require('../controllers/reward.server.controller');
const users = require('../controllers/user.server.controller');

module.exports = function (app) {
    app.route('/projects')
        .get(projects.list)  // done
        .post(projects.create);  // progress

    app.route('/projects/:id')
        // .get(projects.read)
        // .put(projects.update)

    app.route('/projects/:id/image')
        // .get(projects.read)
        // .put(projects.update)

    app.route('/projects/:id/pledge')
        // .post(projects.pledge)

    app.route('/projects/:id/rewards')
        // .get(rewards.list)
        // .put(rewards.update)

    app.route('/users')
        // .post(users.create)

    app.route('/users/login')
        // .post(users.login)

    app.route('/users/logout')
        // .post(users.logout)

    app.route('/users/:id')
        // .get(users.view)
        // .put(users.update)
        // .delete(users.delete)
};