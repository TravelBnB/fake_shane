const fs = require('fs');
var CsvReadableStream = require('csv-reader');

let resultPath = `./dataSet/listings.csv`;
function getRandomInt(max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const catPath = './dataSet/catListings.csv';
let count = 0;
var inputStream = fs.createReadStream(resultPath, 'utf8');
var wstream = fs.createWriteStream(catPath);

inputStream
  .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
  .on('data', (row) => {
    let resultString = '';
    resultString = row.join(',');
    if (count === 0) {
      resultString += ',host,rate,fees,tax_rate,weekly_views,'
      + 'min_stay,max_guests,total_reviews,avg_rating\n';
    } else {
      let maxGuest = getRandomInt(10, 1);
      let rate = getRandomInt(1000, 1);
      let minStay = getRandomInt(3, 1);
      let taxRate = getRandomInt(50, 1) / 100;
      let fee = getRandomInt(10, 3);
      let totalReview = getRandomInt(1000, 0);
      let avgReview = totalReview === 0 ? 0 : getRandomInt(4, 1);
      let weekView = getRandomInt(1000, 0);
      let host = getRandomInt(100000, 1);
      let someString = `,${host},${rate},${fee},${taxRate},${weekView},`
        + `${minStay},${maxGuest},${totalReview},${avgReview}\n`;
      resultString += someString;
    }
    wstream.write(resultString);
    count++;
  })
  .on('end', (data) => {
    console.log(count);
  });
