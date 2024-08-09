import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('habitTrickerAppDB.db')
export default db;