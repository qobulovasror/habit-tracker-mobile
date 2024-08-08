import db from './dbServices';

const addNote = (title, body) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO note (title, body) values (?, ?)',
        [title, body],
        () => {},
        (txObj, error) => console.log('Error at creating: ', error)
      );
    });
  } catch (error) {
    alert(error)
  }
};

const getNotes = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM note',
          [],
          (tx, results) => {
            if (results.rows.length != 0) {
              resolve(results.rows._array);
            } else {
              resolve([]);
            }
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
      });
    } catch (error) {
      alert(error);
    }
  });
};

const updateNote = (id, title, body) => {
  try {
    db.transaction((tx) => {
      tx.executeSql('UPDATE note SET title=?, body=? WHERE id =?;', [
        title,
        body,
        id,
      ]);
    });
  } catch (error) {
    alert(error);
  }
};

const deleteNote = (id) => {
  try {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM note WHERE id=?', [id]);
      },
      (error) => console.log(error),
      () => {}
    );
  } catch (error) {
    console.log(error);
    alert(error)
  }
};

export { addNote, getNotes, updateNote, deleteNote };
