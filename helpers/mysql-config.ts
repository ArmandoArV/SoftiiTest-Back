import mysql, { Pool, PoolConnection } from "mysql2/promise";
import * as dotenv from "dotenv";
import { DbConfig } from "../interfaces/DbConfig";

// Load environment variables from .env file
dotenv.config();

const localConfig: DbConfig = {
  connectionLimit: 10,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "default_database_name", // Fallback database name
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
};

const connection: Pool = mysql.createPool(localConfig);

async function testConnection() {
  let conn: PoolConnection | undefined;
  try {
    conn = await connection.getConnection();
    console.log("Connection established to database:", localConfig.database);
  } catch (err) {
    console.error("Error connecting to database:", err);
  } finally {
    if (conn) conn.release();
  }
}

testConnection();

export default connection;
