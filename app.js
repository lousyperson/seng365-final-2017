const db = require('./config/db'),
    express = require('./config/express'),
    db_init_tables = require('./config/db_init_tables');

const app = express();

// Connect to MySQL on start
db.connect(function (err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    } else {
        db_init_tables.init_database();

        app.listen(4941, function () {
            console.log('Listening on port: ' + 4941);
        });
    }
});