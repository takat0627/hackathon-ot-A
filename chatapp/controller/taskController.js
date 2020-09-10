'use strict';
const dbModels = require('../models/');
const userController = require('../controller/userController');

let taskController = {
  // method1 createUser
  createTask: function (request, response, next) {
    // なぜかここでrequest.session.user.idを使えなかった.
    dbModels.User.findOne({
      where: {
        name: request.body.des_name
      }
    }).then(user => {
      if (!user) {
        console.log("ユーザーデータを取得できませんでした");
        alert("ユーザーデータを取得できませんでした");
      } else {
        console.log("特定のユーザーを取得できました");
        let des_user_id = user.id;

        dbModels.Task.create({
          title: request.body.title,
          info: request.body.info,
          done: false,
          deadline: request.body.date,
          reqUserId: request.body.userId,
          desUserId: des_user_id
        }).then(task => {
          console.log("タスクが正常に作成されました");
          console.log("タスク名：" + task.title);
          response.redirect('/user');
        });
      }
    });

  },


}

module.exports = taskController;