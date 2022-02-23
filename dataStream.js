const moment = require("moment");
const filter = require("./processData");

const onDataStream = (row, process, result) => {
  let dateInEpoch = moment(process.argv[2], "D/M/YYYY H:mm").valueOf();
  let nextDayInEpoch = moment(process.argv[2], "D/M/YYYY H:mm")
    .add(1, "days")
    .valueOf();

  let argumentType = process.argv[2]
    ? isNaN(dateInEpoch)
      ? "token"
      : "date"
    : "none";

  // console.log("result", result);
  if (argumentType == "token" && process.argv[2].toUpperCase() === row.token) {
    filter(row, result);
  } else if (
    argumentType == "date" &&
    dateInEpoch >= row.timestamp &&
    row.timestamp <= nextDayInEpoch
  ) {
    if (process.argv[3] && process.argv[3].toUpperCase() === row.token) {
      filter(row, result);
    } else if (!process.argv[3]) {
      filter(row, result);
    }
  } else if (argumentType == "none") {
    filter(row, result);
  }
};

module.exports = onDataStream;
