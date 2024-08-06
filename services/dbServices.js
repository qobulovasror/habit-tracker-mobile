import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('habitTrickerDB.db')
export default db;