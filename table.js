const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  // host: 'database.server.com',
  database: 'reservations',
  // password: '1234',
  // port: 5432,
});
const path = __dirname + '/dataSet/catListings.csv';

client.connect();
let tableNames = [];
let tableQueries = [];

var tableName = 'users';
var createTableString = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id serial,
  name varchar(30),
  PRIMARY KEY (id)
);`;

tableNames.push(tableName);
tableQueries.push(createTableString);

tableName = 'hosts';
createTableString = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id serial,
  user_id INT references users(id),
  PRIMARY KEY (id)
);`;

tableNames.push(tableName);
tableQueries.push(createTableString);

tableName = 'listings';
createTableString = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id serial,
  name varchar(80),
  host_id INT references hosts(id),
  rate INT NOT NULL,
  fees INT DEFAULT 0,
  tax_rate FLOAT,
  weekly_views INT DEFAULT 0,
  min_stay INT DEFAULT 1,
  max_guests INT,
  total_reviews INT DEFAULT 0,
  avg_rating FLOAT DEFAULT 0,
  PRIMARY KEY (id)
);`;

tableNames.push(tableName);
tableQueries.push(createTableString);

tableName = 'reservations';
createTableString = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id serial,
  listing_id INT references listings(id),
  guest_id INT references users(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_adults INT NOT NULL,
  total_pups INT DEFAULT 0,
  total_charge INT NOT NULL, 
  created_at DATE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);`;

tableNames.push(tableName);
tableQueries.push(createTableString);

let tableCount = 0;
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end();
// });
client.query(tableQueries[tableCount], (err, res) => {
  if (err) {
    console.log(err);
    console.log('ss')

  } else {
    tableCount++;
    console.log('asdas')
    client.query(tableQueries[tableCount], (err, res) => {
      tableCount++;
      client.query(tableQueries[tableCount], (err, res) => {
        tableCount++;
        client.query(tableQueries[tableCount], (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log('aadd');
          }
          client.end();
        });
      });
    });
  }
});

// client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
// [data.text, data.complete, id]);
