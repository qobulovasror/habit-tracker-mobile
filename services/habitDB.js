import db from "./dbServices";

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
        reminderTime TIMESTAMP,
        description TEXT,
        color TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
        []
    );
  });
};

const addHabit = (name, frequency, amount, amountType, change, reminderActive, reminderTime, description, color) => {
  // console.log(name, frequency, amount, amountType, change, reminderActive, reminderTime, description, color);
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO habit 
        (name, frequency, amount, amountType, change, reminderActive, reminderTime, description, color) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        // ["ghgsfdf", 7, 2, "sdfsdf", 1, 0, "", "sdfsdf","08A34FFF"],
        [name, frequency, amount, amountType, change, reminderActive, Math.floor(new Date(reminderTime).getTime() / 1000), description, color],
        (_, results) => {
          console.log("Rows affected:", results);
        },
        (error) => {
          console.log("Error1:", error);
        }
      );
    }, (err) => {
      console.log(err);
    });
  } catch (error) {
    console.error(error);
  }
};

const getHabit = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM habit",[],
          (tx, results) => {
            if (results.rows.length != 0) {
              resolve(results.rows._array);
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