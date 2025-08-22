import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { category } from "../db/schema";
import { eq } from "drizzle-orm";

const expo = SQLite.openDatabaseSync("db.db", { enableChangeListener: true });
const db = drizzle(expo);

// Database logic is kept in this file to keep the other files clean

// Checks to see if there is any data in database with a count in userList
export async function checkDatabaseState() {
  try {
    const count = await db.$count(usersTable);
    console.log(`Current users in the database: ${count}`);
  } catch (error) {
    console.error("Error checking database state:", error);
  }
}

// Initializes the database and creates the table if it doesn't exist
export async function initializeDatabase() {
  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT NOT NULL UNIQUE
      )
    `);
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}
