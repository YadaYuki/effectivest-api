var mysql = require("mysql");
var connectionJson;
if ("production" == process.env.NODE_ENV) {
    connectionJson = {
        connectionLimit:10,
        host: process.env.DB_HOST,
        user: "root",
        password: "pyGiCgyvIxgpn2h4",
        database: "effectivest"
    };
} else {
    connectionJson = {
        connectionLimit:10,
        host: "localhost",
        user: "root",
        password: "Iamamysqleer231",
        database: "effectivest"
    };
}
var connection = mysql.createPool(connectionJson);
connection.getConnection(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
module.exports = connection;