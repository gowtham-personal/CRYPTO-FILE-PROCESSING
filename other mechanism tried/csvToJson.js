const csvtojson = require("csvtojson");

csvtojson()
  .fromFile(`${__dirname}/transactions.csv`)
  .then((csvData) => {
    console.log(csvData);
  })
  .catch((error) => {
    console.log("error", error);
  });
