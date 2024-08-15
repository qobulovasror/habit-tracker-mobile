import db from './dbServices';

const addTracker = (habitId) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tracker (habitId) values (?)',
        [habitId],
        () => {},
        (txObj, error) => console.log('Error at creating: ', error)
      );
    });
  } catch (error) {
    alert(error)
  }
};

const getTrackers = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM tracker",
          [],
          (tx, results) => {
            if (results.rows.length > 0) {
              resolve(results.rows._array);
            } else {
              resolve([]);
            }
          },
          (tx, error) => {
            reject(error);
          }
        );
      }, (error) => {
        console.error('Transaction error:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      reject(error);
    }
  });
};

const getTodayTrackers = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM tracker",
          [],
          (tx, results) => {
            if (results.rows.length != 0) {
              const todayTrackers = results.rows._array.filter((tracker) => {
                const date = new Date(tracker.createAt);
                const today = new Date();
                return (
                  date.getFullYear() == today.getFullYear() &&
                  date.getMonth() == today.getMonth() &&
                  date.getDate() == today.getDate()
                  );
                })
                
                resolve(todayTrackers.map(i=>i.habitId));
            } else {
              resolve([]);
            }
          },
          (tx, error) => {
            console.log(error);
            reject(error);
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};


const deleteTracker = (id) => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM tracker WHERE id=?', [id]);
      },
      (error) => console.log(error),
      () => {}
    );
  } catch (error) {
    console.log(error);
    alert(error)
  }
};

const deleteTrackersByHabitId = (habitId) => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM tracker WHERE habitId=?', [habitId]);
      },
      (error) => console.log(error),
      () => {}
    );
  } catch (error) {
    console.log(error);
    alert(error)
  }
};

export { addTracker, getTrackers, getTodayTrackers, deleteTracker, deleteTrackersByHabitId };
