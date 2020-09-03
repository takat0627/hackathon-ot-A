'use strict';

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('watayo_sample');



// ログイン画面の表示
router.get('/', function(request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function(request, response, next) {
    console.log('ユーザ名：' + request.body.userName);
    let name;
    // DBの処理
    db.serialize(function () {
        // テーブルがなければ作成
        db.run(
            `CREATE TABLE IF NOT EXISTS user (
                name TEXT
            )`
        );

        // 名前を取得している
        db.get(`SELECT name FROM user WHERE name = ${request.body.userName}`, function (err, row) {
            if (!err) {
                name = row.name;
            }
        });


        // もしなかったら追加する
        if (name == null) {
            // prepare Statementでデータ挿入
            let stmt = db.prepare(`INSERT INTO user VALUES (?)`);
            stmt.run([request.body.userName]);
            stmt.finalize();

            name = request.body.userName;
        }
    });
    db.close();

    response.render('room', { userName: name });//入力値をuserNameに代入

});

module.exports = router;
