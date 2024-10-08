import db from './dbServices';

const addHabit = (
  name,
  frequency,
  amount,
  amountType,
  change,
  reminderActive,
  reminderTime,
  color
) => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO habit 
        (name, frequency, amount, amountType, change, reminderActive, reminderTime, color) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name,
            frequency,
            amount,
            amountType,
            change,
            reminderActive,
            Math.floor(new Date(reminderTime).getTime() / 1000),
            color,
          ],
          () => {},
          (_ , error) => {
            console.log('Error:', error);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const getHabit = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM habit",
          [],
          (tx, results) => {
            if (results.rows.length != 0) {
              resolve(results.rows._array);
            } else {
              resolve([]);
            }
          },
          (tx, error) => {
            console.log('err from DB file1:', error);
            reject(error);
          }
        );
      }, (error)=>{
        reject(error);
        console.log(error)
      });
    } catch (error) {
      console.log('err from DB file:', error);
      reject(error);
    }
  });
};

const updateHabit = (
  id,
  name,
  frequency,
  amount,
  amountType,
  change,
  reminderActive,
  reminderTime,
  color
) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE habit SET name=?, frequency=?, amount=?, amountType=?, change=?, reminderActive=?, reminderTime=?, color=?  WHERE id =?;',
        [name, frequency, amount, amountType, change, reminderActive, Math.floor(new Date(reminderTime).getTime() / 1000), color, id],
        () => {},
        (tx, error) => {
          console.log(error);
        }
      );
    }, (error)=>console.log(error));
  } catch (error) {
    alert(error);
  }
};

// const deleteHabit = (id) => {
//   try {
//     db.transaction((tx) => {
//       tx.executeSql("DELETE FROM habit WHERE id=?", [id]);
//     }, (error)=>console.log(error), ()=>console.log("success"));
//   } catch (error) {
//     console.log(error);
//   }
// };

const deleteHabit = (id) => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM habit WHERE id=?;',
          [Number(id)],
          (tx, results) => {
            if (results.rows.length != 0) {
              resolve(results.rows._array);
            } else {
              resolve([]);
            }
          },
          (_, error) => {
            console.log('err from DB file1:', error);
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

export { addHabit, getHabit, updateHabit, deleteHabit };
