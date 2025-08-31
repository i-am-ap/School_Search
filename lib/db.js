// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//     user: "root",
//     host: "localhost",
//     database: "school_prj",
//     password: "1234",
//     port: 3306,
// });

// export default pool;



// import mysql from "mysql2/promise";

// const connection = await mysql.createConnection(process.env.DATABASE_URL);

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
// });

// export default pool;




// db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
