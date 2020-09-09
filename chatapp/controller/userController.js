'use strict';
const dbModels = require('../models/');
let userController = {
    //
    // メソッド １
    // パス: /user/
    // レスポンス: 全てのユーザーを表示する
    //
    showAllUsers() {
        dbModels.User.findAll().then(users => {
            if (!users) {
                console.log("ユーザーデータを取得できませんでした");
            } else {
                console.log("ユーザーとれたよ");
                return users;
            }
        })
    },
    //
    // メソッド 2
    // パス: /user/:userId
    // レスポンス: IDで指定されたユーザーを表示する
    //
    showUserById(user_id){
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

    loginByName: function(request, response, next) {
        // ログインしたユーザーを適切に処理してユーザーの名前を返す.
        let userName = request.body.userName;
        if (!userName) {
            console.log("ユーザーネームを取得できませんでした");
        } else {
            // Sequelizeのモデルを使ってデータを取得する
            // findByPk Pk : PrimaryKey
            dbModels.User.findOne({ where: { name: userName } }).then(user => {
                if (!user) {
                    console.log("ユーザーデータを取得できませんでした");
                    console.log("新しいユーザーを作りログインします");

                    // 新しいユーザーを作る
                    dbModels.User.create({
                        name: userName
                    }).then(createdUser => {
                        request.session.userid = createdUser.id;
                        response.redirect('/user');
                    });
                } else {
                    console.log("特定のユーザーを取得できたのでログインします");
                    request.session.userid = user.id;
                    response.redirect('/user');
                }
            });
        }
    }
};

module.exports = userController;
