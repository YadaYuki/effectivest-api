var mysql = require("mysql");
var connectionJson;
if ("production" == process.env.NODE_ENV) {
    connectionJson = {
        host: "35.236.131.114",
        user: "root",
        password: "pyGiCgyvIxgpn2h4",
        database: "effectivest"
    };
} else {
    connectionJson = {
        host: "localhost",
        user: "root",
        password: "Iamamysqleer231",
        database: "effectivest"
    };
}
var connection = mysql.createConnection(connectionJson);
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
module.exports = connection;