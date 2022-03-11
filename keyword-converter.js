const fs = require('fs');
const obj = require('./keywords.json');

let newObj = {};

for (let i = 0; i < obj.keywords.length; i++) {
  for (let x = 0; x < obj.keywords[i].length; x++) {
    let alts = [];
    for (let y = 0; y < obj.keywords[i].length; y++) {
      if (y !== x) {
        alts.push(obj.keywords[i][y]);
      }
    }
    newObj[obj.keywords[i][x]] = alts;
  }
}
const data = JSON.stringify(newObj);

fs.writeFile('./src/keywords-object.json', data, (err) => {
  if (err) {
    throw err;
  }
  console.log('JSON data is saved.');
});
