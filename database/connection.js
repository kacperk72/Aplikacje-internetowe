var mysql = require("mysql");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'przetargi',
});
connection.connect();
module.exports = connection;