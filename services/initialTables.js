import db from './dbServices';

const createHabitTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS habit (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL,
        frequency INTEGER NOT NULL, 
        amount INTEGER DEFAULT 1,
        amountType TEXT,
        change INTEGER DEFAULT 0,
        reminderActive INTEGER DEFAULT 0, -- Assuming it's a boolean (0 or 1)
        reminderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        color TEXT
    );`,
      [],
      ()=>{},
      (_, error) => console.log(error)
    );
  });
};

const createHabitTrackerTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tracker (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        habitId INTEGER NOT NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
      [],
      ()=>{},
      (_, error) => console.log(error)
    );
  });
};

const createTodoTable = () => {
  db.transaction((tx) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS todo (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT NOT NULL,
          status INTEGER
      );`,
        [],
        ()=>{},
        (_, error) => console.log(error)
      );
    });
  });
};

const createNoteTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS note (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT NOT NULL,
        body TEXT NOT NULL
    );`,
      [],
      ()=>{},
      (txObj, error) => console.log('Error : ', error)
    );
  });
};

const createTables = () => {
  try {
    createHabitTable();
    createHabitTrackerTable();
    createTodoTable();
    createNoteTable();
  } catch (error) {
    console.log('error: ', error);
    alert(error);
  }
};

export default createTables;
