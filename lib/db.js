import mysql from "mysql2/promise";

const pool = mysql.createPool({
    user: "root",
    host: "localhost",
    database: "school_prj",
    password: "1234",
    port: 3306,
});

export default pool;