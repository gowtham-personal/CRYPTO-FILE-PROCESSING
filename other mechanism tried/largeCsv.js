const fs = require('fs');
const readline = require('readline');

const rs = fs.createReadStream(`${__dirname}/transactions.csv`);
const rl = readline.createInterface({ input: rs });

(async () => {
	console.time(__filename);
	for await (const line of rl) {
		// parseline(line);
	}
	console.timeEnd(__filename);
})();

function parseline(line) {
	// const data = line.split('\t');
	// if (data[1] && data[1].match(/^Paris$/g))
	// 	counter++;
    // console.log("Data loaded", line);
}