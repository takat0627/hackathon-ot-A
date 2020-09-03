const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('watayo_sample');

// DBの処理
db.serialize(function () {
  // テーブルがなければ作成
  db.run(
    `CREATE TABLE IF NOT EXISTS user (
                name TEXT
            )`
  );

  let stmt = db.prepare('INSERT INTO user VALUES (?)');
  stmt.run('test_user');
  stmt.finalize();

});
db.close();