const fs = require('fs');
var CsvReadableStream = require('csv-reader');

let resultPath = `./dataSet/catlistings.csv`;
const today = new Date('2018-08-09');
const numberBookings = [0, 0, 0, 1, 1, 2, 1, 2, 3, 0, 5, 6, 10, 15];
let bookingId = 1;
let listingId = 0;

function getRandomInt(max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
function dateString(date) {
  let formatDate = new Date(date);
  return formatDate.toISOString().slice(0, 10);
}

const catPath = './dataSet/reservations.csv';
var inputStream = fs.createReadStream(resultPath, 'utf8');
var wstream = fs.createWriteStream(catPath);

inputStream
  .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
  .on('data', (row) => {
    if (listingId === 0) {
      let resultString = 'id,listing_id,guest_id,check_in,check_out,total_charge,total_pups,'
      + 'total_adults,created_at\n';
      wstream.write(resultString);
    } else {
      let startDate = today;
      let randomInt = getRandomInt(numberBookings.length, 0);
      const numBook = numberBookings[randomInt];
      let minStay = row[7];
      let maxGuest = row[8];
      let rate = row[3];
      for (let k = 0; k < numBook; k++) {
        let daysStay = getRandomInt(10, minStay);
        let randomGap = getRandomInt(5, 1);
        let endDate = addDays(startDate, daysStay);
        let totCharge = rate * daysStay;
        let totPup = getRandomInt(maxGuest, 0);
        let totAdult = maxGuest - totPup;
        let createAt = addDays(startDate, -5);
        let userId = getRandomInt(5000000, 1);
        let resultString = `${bookingId},${listingId},${userId},${dateString(startDate)},${dateString(endDate)},`
          + `${totCharge},${totPup},${totAdult},${dateString(createAt)}\n`;
        wstream.write(resultString);
        bookingId++;
        startDate = addDays(endDate, randomGap);
      }
    }
    listingId++;
  })
  .on('end', (data) => {
    console.log(bookingId);
  });
