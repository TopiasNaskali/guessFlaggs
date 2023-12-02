import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('flagsdb.db');

const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, score INTEGER);'
    );
  });
};

const saveUser = (name, score) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users WHERE name = ?;', [name], (_, results) => {
        if (results.rows.length > 0) {
          console.log('Username', name, 'Already exists.');
        } else {
          tx.executeSql('INSERT INTO users (name, score) VALUES (?, ?);', [name, score || 0], (_, insertResult) => {
            console.log('User saved succesfully!');
          });
        }
      });
    });
  };
  

const getUsers = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM users;', [], (_, results) => {
          const users = results.rows._array;
          resolve(users);
        });
      });
    });
  };
  const saveScore = (name, score) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET score = ? WHERE name = ?;',
        [score, name],
        (_, updateResult) => {
          if (updateResult.rowsAffected > 0) {
            console.log('Score saved succefully!');
          } else {
            console.log('Could not find user', name);
          }
        }
      );
    });
  };
  

  const clearDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM users;', [], (_, deleteResult) => {
        console.log('Tietokanta tyhjennetty onnistuneesti!');
      });
    });
  };

  
export { initDatabase, saveUser, getUsers, saveScore, clearDatabase };