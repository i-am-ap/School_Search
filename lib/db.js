import mysql from "mysql2/promise";

let pool;

if (process.env.DATABASE_URL) {
    //Production (Vercel)
    pool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,  // for Railway/ PlanetScale
        },
    });
} else {
    //Development (Local)
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
}

export default pool;
