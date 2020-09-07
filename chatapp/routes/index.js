'use strict';

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();

// ログイン画面の表示
router.get('/', function(request, response, next) {
    var session = request.session;
    request.session.username = null;
    response.render('index', { 'visitCount' :session.visitCount });
    // response.end();
});

// taskにPOSTした時の処理
router.post('/user', function(request, response, next) {
    const db = new sqlite3.Database('user.db');

    // response.end();	    
    // DBの処理
    db.serialize(function () {
        // テーブルがなければ作成
        db.run(`CREATE TABLE IF NOT EXISTS user ( name TEXT )`);

        // 名前を取得している
        db.get(`SELECT name FROM user WHERE name = ${request.body.userName}`, function (err, row) {
            if (!err) {
                // express-sessionモジュールを用いて現在のユーザー情報を保持
                request.session.username = request.body.userName ;
            }
        });

        // もしなかったら追加する
        if (request.session.username == null) {
            console.log(request.session.username);
            // prepare Statementでデータ挿入
            let stmt = db.prepare(`INSERT INTO user VALUES (?)`);
            stmt.run([request.body.userName]);
            stmt.finalize();
            // express-sessionモジュールを用いて現在のユーザー情報を保持
            request.session.username = request.body.userName ;
        }
    });
    db.close();
    response.render('user', { userName: request.session.username });//入力値をuserNameに代入
});

// チャット画面の表示
router.get('/room', function (request, response, next){
    // requestからユーザー情報を取得する
    response.render('room', { userName: request.session.username });
});

// チャット画面の表示
router.get('/task', function (request, response, next){
    // requestからユーザー情報を取得する
    response.render('task', { userName: request.session.username });
});

// タスク作成画面の表示
router.get('/create-task', function (request, response, next){
    // requestからユーザー情報を取得する
    response.render('create-task', { userName: request.session.username });
});

module.exports = router;
