'use strict';
const dbModels = require('../models/');
const userController = require('../controller/userController');

let taskController = {

  createTask: function (request, response, next) {

    dbModels.Task.create({
          title: request.body.title,
          info: request.body.info,
          done: false,
          deadline: request.body.date,
          reqUserId: request.session.user.id,
          desUserId: request.body.des_name
        }).then(task => {
          console.log("タスクが正常に作成されました");
          console.log("タスク名：" + task.title);
          response.redirect('/user');
        });
  },

  updateTask: function (request, response, next) {

    console.log(request.body.perfect);
    dbModels.Task.update(
      { done: 1 },
      { where: { id: request.body.perfect } }
    ).then(task => {
        console.log(task.done);
        console.log("タスクが正常に更新されました");
        response.redirect('/user');
    });
    
  }
}

module.exports = taskController;