process.stdin.resume();
process.stdin.setEncoding('utf8');
var input_string = '';
// https://www.gesource.jp/weblog/?p=8289

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/task.db');

const task = { requester: 'inoue', 
            destination: 'masakichi',
            date: '12/09',
            title: 'task1',
            bool: false}


// データベースに格納テスト
db.serialize(function() {
    db.run('CREATE TABLE IF NOT EXISTS  task (info TEXT)');
    var stmt = db.prepare('INSERT INTO task VALUES (?)');
    for (var i = 0; i < 10; i++) {
      stmt.run('Ipsum ' + i);
    }
    stmt.finalize();
    db.each('SELECT rowid AS id, info FROM task', function(err, row) {
      console.log(row.id + ': ' + row.info);
    });
  });
  db.close();