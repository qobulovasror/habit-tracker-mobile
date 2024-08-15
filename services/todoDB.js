import db from './dbServices';

const addTodo = (name, status) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO todo (name, status) values (?, ?)',
        [name, status],
        () => {},
        (txObj, error) => console.log('Error ', error)
      );
    });
  } catch (error) {
    alert(error);
  }
};

const getTodos = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT id, name, status FROM todo",
          [],
          (tx, results) => {
            if (results.rows.length != 0) {
              resolve(results.rows._array);
            } else {
              resolve([]);
            }
          },
          (tx, error) => {
            reject(error);
          }
        );
      }, (error)=>{
        console.log(error);
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const changeStatus = (id, status) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE todo SET status=? WHERE id =?;',
        [status, id],
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

const deleteTodo = (id) => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM todo WHERE id=?', 
          [id],
          ()=>{},
          (error)=>{console.log(error)}
        );
      },
      (error) => console.log(error),
    );
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export { addTodo, getTodos, changeStatus, deleteTodo };
