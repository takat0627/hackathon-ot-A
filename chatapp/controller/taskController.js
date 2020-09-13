'use strict';
const dbModels = require('../models/');
const userController = require('../controller/userController');

let taskController = {
  // method1 createTask
  createTask: function (request, response, next) {
    // 2020/09/11 00:00:00
    console.log(request.body.date);
    
    dbModels.Task.create({
      title: request.body.title,
      info: request.body.info,
      done: false,
      deadline: request.body.date,
      reqUserId: request.session.user.id,
      desUserId: request.body.des_userId
    }).then(task => {
      console.log("タスクが正常に作成されました");
      console.log("期限名：" + task.date);
      response.redirect('/user');
    });
  },

  // method2
  updateTask: function (request, response, next) {
    console.log(request.body.taskId);
    dbModels.Task.update(
      {
        title: request.body.title,
        info: request.body.info,
        done: false,
        deadline: request.body.date,
        reqUserId: request.session.user.id,
        desUserId: request.body.des_userId
      },
      {
        where: { id: request.body.taskId }
      }
    ).then(() => {
      console.log("タスクが正常に更新されました");
      response.redirect('/user');
    });
  },

  doneTask: function (request, response, next) {
    console.log(request.body.perfect);
    dbModels.Task.update(
      { done: true },
      { where: { id: request.body.perfect } }
    ).then(task => {
      console.log(task.done);
      console.log("タスクが正常に更新されました");
      response.redirect('/user');
    });
  },

  reDoneTask: function (request, response, next) {
    console.log(request.body.perfect);
    dbModels.Task.update(
      { done: false },
      { where: { id: request.body.perfect } }
    ).then(task => {
      console.log(task.done);
      console.log("タスクが正常に更新されました");
      response.redirect('/user');
    });
  },
}

module.exports = taskController;