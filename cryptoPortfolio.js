const csv = require("csv-parser");
let makeApiCall = require("./apiWrapperUtil");
let CONFIG_CONSTANTS = require("./configConstants");
const fs = require("fs");
const onDataStream = require("./dataStream");

var result = {};
fs.createReadStream(`${__dirname}/transactions.csv`, {
  highWaterMark: 512 * 1024,
})
  .pipe(csv())
  .on("data", function (row) {
    onDataStream(row, process, result);
  })
  .on("end", function () {
    Object.keys(result).map((key) => {
      convertToFiatAmount(key, result);
    });
    console.log("Data loaded", result);
  });

let convertToFiatAmount = async (key, result) => {
  let response = await makeApiCall({
    url: CONFIG_CONSTANTS.URL,
    method: "post",
    params: { fsym: key, tsyms: "USD" },
  });
  result[key] = parseFloat(response.data.USD) * parseFloat(result[key]);
};
