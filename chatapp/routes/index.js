'use strict';

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { render } = require('../app');
const router = express.Router();

// ログイン画面の表示
router.get('/', function(request, response, next) {
    var session = request.session;
    // セッション中のユーザーをリセット
    request.session.username = null;
    response.render('index');
    // response.end();
});

// 個人タスク一覧画面(ログイン時のみ)
router.post('/user', function(request, response, next) {
    const db = new sqlite3.Database('./db/user.db');

    db.serialize(function () {
        // テーブルがなければ作成
        db.run(`CREATE TABLE IF NOT EXISTS user ( name TEXT )`);

        let create = new Promise(function (resolve, reject) {
            // 名前を取得している
            db.get(`SELECT name FROM user WHERE name = '${request.body.userName}'`, function (err, row) {
                let user_exists = false;
                if (err) {
                    reject(err);
                }
                else {
                    if (row !== undefined) {
                        request.session.username = row.name;
                        response.redirect('/user');
                        user_exists = true;
                    }
                    resolve(user_exists);
                }
            });
        });

        create.then(function (user_exists) {
            if (!user_exists) {
                // prepare Statementでデータ挿入
                let stmt = db.prepare(`INSERT INTO user VALUES (?)`);
                stmt.run([request.body.userName]);
                stmt.finalize();
                request.session.username = request.body.userName;
                response.redirect('/user');
            }
            db.close();
        });
    });
});

// チャット退出後→個人一覧画面(データベースで情報取得の必要性がないためGET)
router.get('/user', function (request, response, next){
     // requestからユーザー情報を取得する
     response.render('user', { userName: request.session.username });
});

// チャット画面の表示
router.get('/room', function (request, response, next){
    // requestからユーザー情報を取得する
    response.render('room', { userName: request.session.username });
});

// 全体たすく画面の表示
router.get('/task', function (request, response, next){
    // const db = new sqlite3.Database('task.db');
    // let taskdata;

    // let gettask = new Promise(function (resolve, reject) {
    //     db.each('SELECT rowid AS id, info FROM task', function(err, row) {
    //         if(!err){
    //             console.log(err);
    //         }
    //         else{
    //             console.log('get success!!');
    //             taskdata = row;
    //         }
    //         resolve(taskdata);
    //     });
    //     db.close();
    // });

    // gettask.then(function (taskdata){
    //     // requestからユーザー情報を取得する
    //     response.render('task', taskdata );
    // })
    response.render('task', taskdata );
});

module.exports = router;
