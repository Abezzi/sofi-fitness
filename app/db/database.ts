// import * as SQLite from "expo-sqlite";
//
// // Initialize the database
// const db = SQLite.openDatabaseSync("myDatabase.db");
//
// // Function to set up the database (e.g., create tables)
// export const initDatabase = async () => {
//   await db.execAsync(`
//     PRAGMA journal_mode = WAL;
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY NOT NULL,
//       name TEXT NOT NULL,
//       email TEXT NOT NULL
//     );
//   `);
// };
//
// // Example query functions
// export const insertUser = async (name: string, email: string) => {
//   await db.runAsync("INSERT INTO users (name, email) VALUES (?, ?)", [
//     name,
//     email,
//   ]);
// };
//
// export const getUsers = async () => {
//   return await db.getAllAsync("SELECT * FROM users");
// };
//
// export default db;
