let mysql = require('mysql');
let Config = require('../../config.json');
let sqlQuery = require('./sql-query');

const config = Config.Database.development;
console.log('database----', config)

const dbConnection = mysql.createPool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    connectionLimit: config.connectionLimit
});

class SqlConnection {

    constructor() {}

    create(callback) {
        dbConnection.getConnection((err, connection) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, new sqlQuery(connection));
        })
    }
}

module.exports = SqlConnection;