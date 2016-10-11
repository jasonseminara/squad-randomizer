const fs = require('fs');
const path = require('path');

const StudentRandomizer = require('./model/StudentRandomizer');

// let's pull off the first two node params; we only care about the given params
const [a, b, studentCount, instructorCount, rotations, format] = process.argv;

// the params come in as strings; we need them as numbers,
const results = new StudentRandomizer().execute(+studentCount, +instructorCount, +rotations);

let fileType = 'txt';

const prettyPrinted = ((f, data) => {
  switch (f) {
    case 'csv':
      fileType = 'csv';
      return data.join('\n');

    case 'json':
      fileType = 'json';
      return JSON.stringify(data);

    default:
      fileType = 'txt';
      return data;
  }
})(format, results);

const fileName = `squads-${Date.now()}.${fileType}`;


fs.writeFile(path.join(__dirname, fileName), prettyPrinted, (err) => {
  let logData = `Squads Created!\t${fileName}\t${Date.now()}\n`;

  if (err) {
    logData = `Squads Creation Failed!\t${Date.now()}\n`;
  }

  /* write a log stating that all went well */
  fs.appendFile(path.join(__dirname, 'squadRotations.log'), logData, (logErr) => {
    if (logErr) throw logErr;
  });
});
