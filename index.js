const fs = require('fs')
const { generateTable } = require('./schedule-coincidences');

const filename = process.argv[2];
if (!filename) {
  console.error("You have to specify a file!");
  process.exit(1);
}

let text = '';
try {
  text = fs.readFileSync(filename, 'utf8')
} catch (err) {
  console.error(`Could not read file: ${err}`);
  process.exit(1);
}

console.log(generateTable(text));
