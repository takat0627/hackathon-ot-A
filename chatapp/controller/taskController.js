'use strict';
const dbModels = require('../models/');
const userController = require('../controller/userController');

let taskController = {
  // method1 createUser

  createTask: function (request, response, next) {
    // なぜかここでrequest.session.user.idを使えなかった.
  
    let des_user_id = request.body.des_name;

    dbModels.Task.create({
          title: request.body.title,
          info: request.body.info,
          done: false,
          deadline: request.body.date,
          reqUserId: request.session.user.id,
          desUserId: des_user_id
        }).then(task => {
          console.log("タスクが正常に作成されました");
          console.log("タスク名：" + task.title);
          response.redirect('/user');
        });
  }
}

module.exports = taskController;