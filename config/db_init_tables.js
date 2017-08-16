const db = require('./db');

exports.init_database = function () {
    const clear_database =
        // "CREATE DATABASE IF NOT EXISTS crowd_funding;" +
        // "USE crowd_funding;" +
        "SET FOREIGN_KEY_CHECKS = 0;" +
        "DROP TABLE IF EXISTS cf_users;" +
        "DROP TABLE IF EXISTS cf_projects;" +
        "DROP TABLE IF EXISTS cf_creators;" +
        "DROP TABLE IF EXISTS cf_rewards;" +
        "DROP TABLE IF EXISTS cf_tokens;" +
        "DROP TABLE IF EXISTS cf_backers;" +
        "SET FOREIGN_KEY_CHECKS = 1;";

    db.get().query(clear_database, function (err, rows) {
        if (err) console.log(err);
        else create_tables();
    });
};

function create_tables() {
    create_users_table();
    create_projects_table();
    create_creators_table();
    create_rewards_table();
    create_tokens_table();
    create_backers_table();
}

function create_users_table() {
    const create_users_table =
        // "USE crowd_funding; " +
        "DROP TABLE IF EXISTS cf_users;" +
        "CREATE TABLE cf_users" +
        "(" +
        "user_id    int         auto_increment          ," +
        "username   varchar(30) not null        unique ," +
        "location   varchar(30)                         ," +
        "email      varchar(30)                         ," +
        "password   varchar(30) not null                ," +
        "primary key (user_id)" +
        ");";

    db.get().query(create_users_table, function (err, rows) {
        if (err) console.log(err);
    });
}

function create_projects_table() {
    const create_projects_table =
        // "USE crowd_funding; " +
        "DROP TABLE IF EXISTS cf_projects;" +
        "CREATE TABLE cf_projects " +
        "(" +
        "project_id     int             auto_increment                  ," +
        "title          varchar(30)     not null                        ," +
        "subtitle       varchar(30)                                     ," +
        "description    varchar(100)                                    ," +
        "imageUri       varchar(100)                                    ," +
        "target         int             not null                        ," +
        // "creators       int                                             ," +
        // "rewards        int                                             ," +
        "creation_date  timestamp       not null        default now()   ," +
        "PRIMARY KEY (project_id)" +
        ");";

    db.get().query(create_projects_table, function (err, rows) {
        if (err) console.log(err);
    });
}

function create_creators_table() {
    const create_creators_table =
        // "USE crowd_funding; " +
        "DROP TABLE IF EXISTS cf_creators;" +
        "CREATE TABLE cf_creators " +
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
        // "USE crowd_funding; " +
        "DROP TABLE IF EXISTS cf_rewards;" +
        "CREATE TABLE cf_rewards " +
        "(" +
        "rewards_id     int         auto_increment              ," +
        "project_id     int                                     ," +
        "reward_id      int         not null                    ," +
        "amount         int         not null        default 1   ," +
        "description    varchar(100)                            ," +
        // "FOREIGN KEY (rewards_id) references projects(rewards)," +
        // "FOREIGN KEY (project_id) references projects(project_id)," +
        "PRIMARY KEY (rewards_id)" +
        ");";

    db.get().query(create_rewards_table, function (err, rows) {
        if (err) console.log(err);
    });
}

function create_tokens_table() {
    const create_tokens_table =
        "DROP TABLE IF EXISTS cf_tokens;" +
        "CREATE TABLE cf_tokens " +
        "(" +
        "user_id    int         ," +
        "token      varchar(30) ," +
        "PRIMARY KEY (user_id)" +
        ");";

    db.get().query(create_tokens_table, function (err, rows) {
        if (err) console.log(err)
    })
}

function create_backers_table() {
    const create_backers_table =
        "DROP TABLE IF EXISTS cf_backers;" +
        "CREATE TABLE cf_backers " +
        "(" +
        "backers_id int                 ," +
        "user_id    int                 ," +
        "amount     int                 ," +
        "project_id int     not null    ," +
        "PRIMARY KEY (backers_id)" +
        ");";

    db.get().query(create_backers_table, function (err, rows) {
        if (err) console.log(err)
    })
}