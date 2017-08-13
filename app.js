const db = require('./config/db'),
    express = require('./config/express');

const app = express();

// Connect to MySQL on start
db.connect(function (err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    } else {
        create_tables();

        app.listen(4941, function () {
            console.log('Listening on port: ' + 4941);
        });
    }
});

function create_tables() {
    // const query = "create database lab5;" +
    //     "flush privileges;" +
    //     "use lab5;";
    const query = "show databases";
    db.get().query(query, function (err, rows) {
        console.log(err);
        console.log(rows)
    });
}