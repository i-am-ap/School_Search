import mysql from "mysql2/promise";
import url from "url";

let pool;

if (process.env.DATABASE_URL) {
    // Parse DATABASE_URL into parts
    const { hostname, port, pathname, auth } = new url.URL(process.env.DATABASE_URL);
    const [user, password] = auth.split(":");

    //Production (Vercel)
    pool = mysql.createPool({
        host: hostname,
        port,
        user: username,
        password,
        database: pathname.replace("/", ""),
        ssl: process.env.NODE_ENV === "production" ? {
            rejectUnauthorized: false,  // for Railway/ PlanetScale
        } : undefined,      // No SSL locally
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
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
