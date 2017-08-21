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
        // .all(authenWare)
        .get(projects.listProjects)  // done
        .post(projects.createProject);  // done

    app.route(basePath + '/projects/:id')
        .get(projects.getOne)  // done
        .put(projects.updateProject);  // done

    app.route(basePath + '/projects/:id/image')
        .get(projects.getImg)  // done
        .put(projects.updateImg);  // done

    app.route(basePath + '/projects/:id/pledge')
        .post(projects.pledge);  // done

    app.route(basePath + '/projects/:id/rewards')
        .get(rewards.listRewards)  // done
        .put(rewards.updateReward); // done

    app.route(basePath + '/users')
        .post(users.createUser);  // done

    app.route(basePath + '/users/login')
        .post(users.login);  // done

    app.route(basePath + '/users/logout')
        .post(users.logout);  // done

    app.route(basePath + '/users/:id')
        .get(users.userById)  // done
        .put(users.updateUser)  // done
        .delete(users.deleteUser)  // done
};