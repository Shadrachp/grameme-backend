const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: "3001",
  database: "grameme"
});

module.exports = pool;
