import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('habitTrickerDB')
export default db;