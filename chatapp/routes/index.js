'use strict';

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const userController = require('../controller/userController');
const taskController = require('../controller/taskController');
const { render } = require('../app');
const router = express.Router();

// ログイン画面の表示
router.get('/', function (request, response, next) {
    let session = request.session;
    // セッション中のユーザーをリセット
    request.session.username = null;
    response.render('index');
    // response.end();
});


// 個人タスク一覧画面(ログイン時のみ)
router.post('/user', userController.loginByName);

// チャット退出後→個人一覧画面(データベースで情報取得の必要性がないためGET)
router.get('/user', userController.showUsersTasks);

// チャット画面の表示
router.get('/room', function (request, response, next) {
    // requestからユーザー情報を取得する
    response.render('room', { user: request.session.user });
});

// router.get('/task', userController.showAllUsersWithDestinationTasks);
router.get('/task', userController.showAllUsersWithTasks);

// タスク作成画面の表示
router.get('/create-task', function (request, response, next){
    // requestからユーザー情報を取得する
    response.render('create-task', { user: request.session.user });
});

// タスク作成
router.post('/create-task', taskController.createTask);

// 個人タスクをJSONで返すサンプルルーティング
router.get('/json', userController.showUsersTasks);

// （共有用）全体タスクのサンプルに対するget（ひとまず直接URL叩くと見れるようにする）
router.get('/task_sample', function (request, response, next) {
    response.render('samples/task_sample');
});


module.exports = router;
