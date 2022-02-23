const fs = require("fs");
const fastcsv = require("fast-csv");
var csv = require("csv-parser");
var result = {};
let stream = fs.createReadStream(`${__dirname}/transactions.csv`, {
  highWaterMark: 512 * 1024,
});
let csvStream = fastcsv
  .parse()
  .on("data", function (row) {
    // console.log("Data loading", data);
    if (row[1] == "DEPOSIT") {
      // resultSchema[`${row[2]}-${row[1]}`] += row[3];
      if (result[row[2]]) {
        result[row[2]] += parseFloat(row[3]);
      } else {
        result[row[2]] = parseFloat(row[3]);
      }
    } else {
      // resultSchema[`${row[2]}-${row[1]}`] = row[3];
      if (result[row[2]]) {
        result[row[2]] -= parseFloat(row[3]);
      } else {
        result[row[2]] = -parseFloat(row[3]);
      }
    }
  })
  .on("end", function () {
    // remove the first line: header
    // csvData.shift();
    console.log("Data loaded", result);
  });
stream.pipe(csvStream);
