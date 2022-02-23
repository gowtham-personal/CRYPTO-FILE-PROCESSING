const StreamZip = require("node-stream-zip");
const zip = new StreamZip({
  file: "transactions.csv.zip",
  storeEntries: true,
});

zip.on("ready", () => {
  console.log("Entries read: " + zip.entriesCount);
  for (const entry of Object.values(zip.entries())) {
    const desc = entry.isDirectory ? "directory" : `${entry.size} bytes`;
    console.log(`Entry ${entry.name}: ${desc}`);
    zip.stream(`/${entry.name}`, (err, stm) => {
      stm.pipe(process.stdout);
      stm.on("end", () => zip.close());
    });
  }
  // Do not forget to close the file once you're done
  zip.close();
});
