const db = require('./config/db'),
    express = require('./config/express');

const app = express();

// Connect to MySQL on start
db.connect(function (err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    } else {
        init_database();

        app.listen(4941, function () {
            console.log('Listening on port: ' + 4941);
        });
    }
});

function init_database() {
    const clear_database =
        "CREATE DATABASE IF NOT EXISTS crowd_funding;" +
        "USE crowd_funding;" +
        "SET FOREIGN_KEY_CHECKS = 0;" +
        "DROP TABLE IF EXISTS users;" +
        "DROP TABLE IF EXISTS projects;" +
        "DROP TABLE IF EXISTS creators;" +
        "DROP TABLE IF EXISTS rewards;" +
        "SET FOREIGN_KEY_CHECKS = 1;";

    db.get().query(clear_database, function (err, rows) {
        if (err) console.log(err);
        else create_tables();
    });
}

function create_tables() {
    create_users_table();
    create_projects_table();
    create_creators_table();
    create_rewards_table();
}

function create_users_table() {
    const create_users_table =
        "USE crowd_funding; " +
        "DROP TABLE IF EXISTS users;" +
        "CREATE TABLE users" +
        "(" +
        "user_id    int         auto_increment  ," +
        "username   varchar(30) not null        ," +
        "location   varchar(30)                 ," +
        "email      varchar(30)                 ," +
        "password   varchar(30) not null        ," +
        "primary key (user_id)" +
        ");";

    db.get().query(create_users_table, function (err, rows) {
        if (err) console.log(err);
    });
}

function create_projects_table() {
    const create_projects_table =
        "USE crowd_funding; " +
        "DROP TABLE IF EXISTS projects;" +
        "CREATE TABLE projects " +
        "(" +
        "project_id     int             auto_increment  ," +
        "title          varchar(30)     not null        ," +
        "subtitle       varchar(30)                     ," +
        "description    varchar(100)                    ," +
        "imageUri       varchar(100)                    ," +
        "target         int             not null        ," +
        "creators       int                             ," +
        "rewards        int                             ," +
        "PRIMARY KEY (project_id)" +
        ");";

    db.get().query(create_projects_table, function (err, rows) {
        if (err) console.log(err);
    });
}

function create_creators_table() {
    const create_creators_table =
        "USE crowd_funding; " +
        "DROP TABLE IF EXISTS creators;" +
        "CREATE TABLE creators " +
        "(" +
        "creators_id    int         auto_increment  ," +
        "project_id     int         not null        ," +
        "user_id        int         not null        ," +
        "name           varchar(30)                 ," +
        // "FOREIGN KEY (creators_id) references projects(creators)," +
        // "FOREIGN KEY (project_id) references projects(project_id)," +
        // "FOREIGN KEY (user_id) references users(user_id)," +
        "PRIMARY KEY (creators_id)" +
        ");";

    db.get().query(create_creators_table, function (err, rows) {
        if (err) console.log(err);
    });
}

function create_rewards_table() {
    const create_rewards_table =
        "USE crowd_funding; " +
        "DROP TABLE IF EXISTS rewards;" +
        "CREATE TABLE rewards " +
        "(" +
        "rewards_id     int         auto_increment  ," +
        "project_id     int                         ," +
        "reward_id      int         not null        ," +
        "amount         int         not null        ," +
        "description    varchar(100)                ," +
        // "FOREIGN KEY (rewards_id) references projects(rewards)," +
        // "FOREIGN KEY (project_id) references projects(project_id)," +
        "PRIMARY KEY (rewards_id)" +
        ");";

    db.get().query(create_rewards_table, function (err, rows) {
        if (err) console.log(err);
    });
}