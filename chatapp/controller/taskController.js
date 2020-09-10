'use strict';
const dbModels = require('../models/');
const userController = require('../controller/userController');
let taskController = {
  //
  // メソッド2
  // ユーザーの持つ全ての依頼側タスクを表示する
  //
  // メソッド 3
  // ユーザーの持つ全ての受理側タスクを表示する　（）
  showUserById(user_id) {
    let userId = user_id;
    if (!userId) {
      console.log("ユーザーIDを取得できませんでした");
    } else {
      // Sequelizeのモデルを使ってデータを取得する
      // findByPk Pk : PrimaryKey
      dbModels.User.findByPk(userId).then(user => {
        if (!user) {
          console.log("ユーザーデータを取得できませんでした");
        } else {
          console.log("特定のユーザーを取得できました");
          return user;
        }
      });
    }
  },

};

module.exports = taskController;