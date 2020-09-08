process.stdin.resume();
process.stdin.setEncoding('utf8');
var input_string = '';
// https://www.gesource.jp/weblog/?p=8289

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/masaya_sample');


// 適当にタスク作成
const task = { req: 1,//requester
            des: 2, //destination
            date: '1209',
            title: 'task',
            info: '適当にやってどうぞ',
            bool: 1} // SQLiteにはBOOLEAN型が存在しない


// データベースに格納テスト
db.serialize(function() {
    db.run(
      'CREATE TABLE IF NOT EXISTS task (req INTEGER, des INTEGER, date TEXT, title TEXT, info TEXT, bool INTEGER)'
    );
    var stmt = db.prepare('INSERT INTO task VALUES (?, ?, ?, ?, ? ,?)');
    for (var i = 0; i < 10; i++) {
      stmt.run(task.req, task.des, task.date, task.title+i+1, task.info+i+1, task.bool);
    }
    stmt.finalize();
    db.each('SELECT rowid AS id, info FROM task', function(err, row) {
      console.log(row.id + ': ' + row.info);
    });
  });
db.close();