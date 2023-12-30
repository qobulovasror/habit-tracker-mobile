import db from "./dbServices";

const createHabitTable = () => {
  console.log(1);
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS habita (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        frequency INTEGER NOT NULL, 
        amount: INTEGER DEFAULT 1,
        amountType: TEXT,
        change: INTEGER DEFAULT 0,
        reminderActive BOOLEAN ,
        reminderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        description,
        color VARCHAR(10),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        [],
        (_, result) => console.log("habit table created", result),
    );
  });
};

const addHabit = (name, frequency, amount, amountType, change, reminderActive, reminderTime, description, color) => {
  console.log(name, frequency, amount, amountType, change, reminderActive, reminderTime, description, color);
  try {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO habit (name, frequency, amount, amountType, change, reminderActive, reminderTime, description, color) VALUES (?, ?, ?, ?, ?, ?)", 
      [name, frequency, amount, amountType, change, reminderActive, reminderTime, description, color]);
    });
  } catch (error) {
    alert(error);
  }
};

const getHabit = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM habit;",[],
          (tx, results) => {
            if (results.rows.length > 0) {
              resolve(results.rows.item(0).value);
            } else {
              resolve([]);
            }
          },
          (error) => {
            console.log("err from DB file1:", error);
            reject(error);
          }
          );
        });
      } catch (error) {
        console.log('err from DB file:', error);
        reject(error);
    }
  });
};

const updateHabit = (id, name, frequency, reminderActive, reminderTime, description, color) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE habit SET name=?, frequency=?, reminderActive=?, reminderTime=?, description=?, color=?  WHERE id =?;",
          [name, frequency, reminderActive, reminderTime, description, color, id]
        );
      });
    } catch (error) {
      alert(error);
    }
  };

const deleteHabit = (id) => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM habit WHERE id=?", [id]);
  });
};

export { 
    createHabitTable, 
    addHabit, 
    getHabit, 
    updateHabit,
    deleteHabit 
};