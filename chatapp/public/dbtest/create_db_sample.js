/* check 
# user
sqlite3 ../../db/multi-samples.db 'SELECT rowid AS id, info FROM user'
# task
sqlite3 ../../db/multi-samples.db 'SELECT rowid AS id, req, des, date, title, info, done FROM task'
*/

require('date-utils');

process.stdin.resume();
process.stdin.setEncoding('utf8');
let input_string = '';
// https://www.gesource.jp/weblog/?p=8289

const { exec } = require('child_process')

const sqlite3 = require('sqlite3').verbose();

// remove
exec('rm "../../db/multi-samples.db"', (err, stdout, stderr) => {
  if (err) {
    return
  }
  else{
    console.log('remove DBfile')
  }
});


const db = new sqlite3.Database('../../db/multi-samples.db');
// 依頼される，依頼するユーザの合計 (20人生成)
const user_num = 20


// ユーザ生成
db.serialize(function() {
  // ここに更新系を書くと動く
  db.run('CREATE TABLE user (info TEXT)');
  // 基準となるSQL文（動的に変更できるパラメータ）
  var stmt = db.prepare('INSERT INTO user VALUES (?)');
  // 10件のレコード追加
  for (var i = 0; i < user_num ; i++) {
    stmt.run([`user${i+1}`]);
  }
  // stmtのメモリを解放
  stmt.finalize();
  db.each('SELECT rowid AS id, info FROM user', function(err, row) {
    console.log(row.id + ': ' + row.info);
  });
});



// 適当な数でタスク作成
// 依頼する側と依頼される側をもっと丁寧にテストのために生成
// ここでは依頼先を指定して依頼元をランダムに生成すればいい

const min = 1;
let randomIntegerCreator = function(min, max){
  return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}



const task = { req: 1,//requester
            des: 2, //destination
            date: -1, //will set unixtime
            title: 'task',
            info: 'タスク情報',
            done: -1} // SQLiteにはBOOLEAN型が存在しない

// forで回すとほとんど同じ時間なので基準から適当な時間を足す
let dt = new Date()
let unix_time = dt.getTime()

db.serialize(function() {
  db.run(
    'CREATE TABLE IF NOT EXISTS task (req INTEGER, des INTEGER, date INTEGER, title TEXT, info TEXT, done INTEGER)'
  );
  let stmt = db.prepare('INSERT INTO task VALUES (?, ?, ?, ?, ? ,?)');
  // user
  const hour = ( 1000 * 60 * 60 )
    for (let i = 1; i <= user_num; i++) {
      // task -> いろいろ適当にデータベースに格納してみる
      // 以下のコメントは10人の場合
      let j = 0;
      let count = 1;
      let done = 0;
      let time = 0;
      let destination_user = 0;
      while(j < 3){
        destination_user = randomIntegerCreator(min, user_num);
        // [2個] 3, 6, 9 -> 元々3個に設定していたのでこの順番ですが，3つが多くてHTMLで見にくかったので2個に設定しました．
        if(i%3===0){
          time = (unix_time) + (j * hour * 24) + (i * 1e+8 * j) + (destination_user * 1e+6)
          if(j%2===0){
            done=1;
          }
          j+=2;
        }
        // [3個] 5, 10
        else if(i%5===0){
          time = (unix_time) - (j * hour * 24) * i + (destination_user * 1e+4)
          if (j===2){
            done=1;
          }
          j++;
        }
        // [1個] 1, 2, 4, 7, 8
        else{
          time = (unix_time) - (hour * 24) - (i * 1e+6) - (destination_user * 1e+6)
          j+=3;
        }

        stmt.run(i, destination_user, time, task.title + i + "-" +  count, task.info, done);
        count++;
      }
    }
  stmt.finalize();
  db.each('SELECT rowid AS id, req, des, date, title, done FROM task', function(err, row) {
    const dt_format =  (new Date(row.date)).toFormat('YYYY年 M月D日 HH24:MI:SS')
    console.log(`==================== user : ${row.req} ====================\n`)
    console.log(`[${row.id}] ${row.title} => request_user : ${row.req}`);
    console.log(`[${row.id}] ${row.title} => destination_user : ${row.des}`);
    console.log(`[${row.id}] ${row.title} => date : ${dt_format}`);
    console.log(`[${row.id}] ${row.title} => done : ${row.done}`);
    console.log("\n==================================================")
  });
});
db.close();