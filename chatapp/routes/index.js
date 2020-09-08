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
    if(request.session.username === undefined){
        response.redirect('/');
    }else{
        // requestからユーザー情報を取得する
        response.render('user', { userName: request.session.username });
    }
});

// チャット画面の表示
router.get('/room', function (request, response, next){
    // requestからユーザー情報を取得する
    response.render('room', { userName: request.session.username });
});

// 全体たすく画面の表示
router.get('/task', function (request, response, next){
    if(request.session.username === undefined){
        response.redirect('/');
        console.log('session out')
        return
    }
    // const db = new sqlite3.Database('./db/masaya_sample');
    const db = new sqlite3.Database('./db/multi-samples.db');

    // タスク情報取得後に全体タスク画面にrender
    let getdata = new Promise(function (resolve_getdata, reject) {
        /* 
            送る形式が以下のようになればいけるようになった．特にhbsのために階層的にする必要がある
            RDBでこうゆうのすぐに引っ張ってこれるのでしょうか？
            data = {
                username : ~~,
                user : [{
                    id : 1,
                    task : [
                        id=1のタスク配列
                    ]
                },
                {
                    id : 2,
                    task : [
                        id=2のタスク配列
                    ]
                },~~~
                ]
            }
        */

        let data = {
            userName : request.session.username,
            user : []
        };

        db.serialize(function() {
            // 完全にpushしてから終了するためにここでユーザ名を取得しておく．
            let userNum = 0;
            db.get('SELECT count(rowid) AS num FROM user', function(err, row){
                userNum = row.num;       
                console.log('user num :', userNum);
            });
            // allをeach順通りに実行するにはserializeが中に必須！
            db.each(`SELECT rowid AS id, info FROM user`, function(err, row) {
                db.serialize(function() {
                    /*
                    （修正）
                    ここではタスクを受けてる一覧なのでdesにあるかどうか確認
                    期限順(unixtime)が短い順（昇順）に並び替える 
                    => が！
                    req, des, date, title, info, bool */
                    
                    db.all(`SELECT * FROM task WHERE ${row.id}=des ORDER BY date ASC`, function(err, rows_task) {
                        let hasTask = true;
                        // 空の時は持っているタスクがないのでそれに関するflagを渡しておくことでhandlbardsで簡単に認識できるようにする．
                        if(rows_task.length === 0){
                            hasTask = false;
                        }

                        data['user'].push({
                            id : row.id , 
                            task : rows_task,
                            hasTask : hasTask
                        });

                        // この条件でかならずpushされてから送れる！
                        if (data['user'].length===userNum){
                            console.log(data)
                            resolve_getdata(data);
                        }
                    });
                });
            });
        });
    });

    getdata.then( function(data) {
        // ログイン中のユーザ名もJSONで送る
        console.log('user', data.user)
        console.log('user[0].task', data.user[0].task)
        response.render('task', data);
        db.close();
    });
});

// （共有用）全体タスクのサンプルに対するget（ひとまず直接URL叩くと見れるようにする）
router.get('/task_sample', function (request, response, next){
    response.render('samples/task_sample');
});


// タスク作成画面の表示
router.get('/create-task', function (request, response, next){
    // requestからユーザー情報を取得する
    response.render('create-task', { userName: request.session.username });
});


module.exports = router;
