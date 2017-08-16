const projects = require('../controllers/project.server.controller');
const rewards = require('../controllers/reward.server.controller');
const users = require('../controllers/user.server.controller');

// ------TESTING PURPOSE------
function testing(req, res) {
    const db = require('../../config/db.js');
    db.get().query('show tables;', function (err, rows) {
        res.json(rows);
    });
}
// ---------------------------

// function isValidToken(token_string) {
//     if (token_string) {
//         return true
//     } else {
//         return false
//     }
// }
//
// function authenWare(req, res, next) {
//     if (isValidToken(req.get('X-Authorization'))) {
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }

module.exports = function (app) {
    app.route("/")
        .get(testing);

    app.route('/projects')
        // .all(authenWare)
        .get(projects.list)  // done
        .post(projects.create);  // done-ish (auth)

    app.route('/projects/:id')
        .get(projects.read)  // assume
        // .put(projects.update)

    app.route('/projects/:id/image')
        // .get(projects.read)
        // .put(projects.update)

    app.route('/projects/:id/pledge')
        // .post(projects.pledge)

    app.route('/projects/:id/rewards')
        .get(rewards.list)  // done-ish
        .put(rewards.update); // done-ish (auth)

    app.route('/users')
        .post(users.create);  // done-ish

    app.route('/users/login')
        .post(users.login);  // done-ish

    app.route('/users/logout')
        // .post(users.logout)

    app.route('/users/:id')
        .get(users.userById)  // done-ish
        // .put(users.update)
        // .delete(users.delete)
};