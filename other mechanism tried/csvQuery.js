var csvdb = require("node-csv-query");
var databaseConnection = null;

csvdb(__dirname + "/transactions.csv").then(function (db) {
  databaseConnection = db;
});

databaseConnection
  .findOne({
    token: "BTC",
  })
  .then(function (record) {
    // Do some stuff
    console.log("record", record);
  });
