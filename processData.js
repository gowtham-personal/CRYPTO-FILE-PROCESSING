const filter = (row, result) => {
  if (row.transaction_type == "DEPOSIT") {
    if (result[row.token]) {
      result[row.token] += parseFloat(row.amount);
    } else {
      result[row.token] = parseFloat(row.amount);
    }
  } else {
    if (result[row.token]) {
      result[row.token] -= parseFloat(row.amount);
    } else {
      result[row.token] = -parseFloat(row.amount);
    }
  }
};

module.exports = filter;
