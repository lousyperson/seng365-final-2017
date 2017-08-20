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
    app.route(basePath + "/")
        .get(testing);

    app.route(basePath + '/projects')
        // .all(authenWare)
        .get(projects.listProjects)  // done
        .post(projects.createProject);  // recheck

    app.route(basePath + '/projects/:id')
        .get(projects.read)  // assume
        .put(projects.update);  // assume

    app.route(basePath + '/projects/:id/image')
        .get(projects.showImg)  // assume
        .put(projects.updateImg);  // assume

    app.route(basePath + '/projects/:id/pledge')
        .post(projects.pledge);  // done-ish (auth)

    app.route(basePath + '/projects/:id/rewards')
        .get(rewards.list)  // done-ish
        .put(rewards.update); // done-ish (auth)

    app.route(basePath + '/users')
        .post(users.createUser);  // done

    app.route(basePath + '/users/login')
        .post(users.login);  // done-ish

    app.route(basePath + '/users/logout')
        .post(users.logout);  // recheck

    app.route(basePath + '/users/:id')
        .get(users.userById)  // done-ish
        .put(users.updateUser)  // assume
        .delete(users.deleteUser)  // assume
};