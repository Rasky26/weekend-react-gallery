// // Copied this file from the `fullstack-pantry-app` classroom project
// const pg = require('pg');
// const url = require('url');

// // Connect to the local database
// const DATABASE_NAME = 'react_gallery';
// let config = {};

// if (process.env.DATABASE_URL) {
//   // Heroku gives a url, not a connection object
//   // https://github.com/brianc/node-pg-pool
//   const params = url.parse(process.env.DATABASE_URL);
//   const auth = params.auth.split(':');

//   config = {
//     user: auth[0],
//     password: auth[1],
//     host: params.hostname,
//     port: params.port,
//     database: params.pathname.split('/')[1],
//     ssl: true, // heroku requires ssl to be true
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//   };
// } else {
//   config = {
//     host: 'localhost', // Server hosting the postgres database
//     port: 5432, // env var: PGPORT
//     database: DATABASE_NAME, 
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//   };
// }

// // this creates the pool that will be shared by all other modules
// const pool = new pg.Pool(config);

// // the pool will log when it connects to the database
// pool.on('connect', () => {
//   console.log('Postgesql connected');
// });

// // the pool with emit an error on behalf of any idle clients
// // it contains if a backend error or network partition happens
// pool.on('error', (err) => {
//   console.log('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// module.exports = pool;


// ------------------------------
// FROM CLASS
const pg = require('pg')

let pool
if (process.env.DATABASE_URL) {

  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
  })
}

else {
  pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: 'react_gallery'
  })
}