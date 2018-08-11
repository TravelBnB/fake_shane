const fs = require('fs');
const faker = require('faker/locale/en');

// let resultPath = `./dataSet/users.csv`;
// var wstream = fs.createWriteStream(resultPath);

function getRandomInt(max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// wstream.write('id,name\n');
// for (let i = 1; i <= 5000000; i++) {
//   let someString = `${i},${faker.name.findName()}\n`;
//   // if (i % 1000000 === 0) {
//   //   console.log(i)
//   // }
//   wstream.write(someString);
// }

var resultPath = `./dataSet/hosts.csv`;
var wstream = fs.createWriteStream(resultPath);
wstream.write('id,user_id\n');

for (let i = 1; i <= 100000; i++) {
  let someString = `${i},${getRandomInt(5000000, 1)}\n`;
  wstream.write(someString);
}
