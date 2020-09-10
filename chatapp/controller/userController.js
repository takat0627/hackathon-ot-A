'use strict';
const dbModels = require('../models/');
let userController = {
    //
    showAllUsersWithTasks: function (request, response, next) {
        dbModels.User.findAll({
            include: [
                {
                    model: dbModels.Task,
                    as: 'desTask',
                }
            ]
        }).then(users => {
            if (!users) {
                console.log("ユーザーデータを取得できませんでした");
            } else {
                console.log("ユーザーが取得できました");
                console.dir(users[0]);
                console.dir(users[0].reqTask);
                console.dir(users[0].reqTask[0].title);
                response.render('task', { userName: request.session.user.name, user: users });

            }
        })
    },
    //
    showUsersTasks: function (request, response, next) {
        if (request.session.user === undefined) {
            response.redirect('/');
        } else {
            // requestからユーザー情報を取得する
            dbModels.User.findByPk(request.session.user.id,{
                include: [
                    {
                        model: dbModels.Task,
                        as: 'desTask',
                    }
                ]
            }).then(user_with_desTask => {
                if (!user_with_desTask) {
                    console.log("ユーザーデータを取得できませんでした");
                } else {
                    console.log("ユーザーが取得できました");
                    // desTaskを持ったUser
                    dbModels.User.findByPk(request.session.user.id,{
                        include: [
                            {
                                model: dbModels.Task,
                                as: 'reqTask',
                            }
                        ]
                    }).then(user_with_reqTask => {
                        if (!user_with_reqTask) {
                            console.log("ユーザーデータを取得できませんでした");
                        } else {
                            console.log("ユーザーが取得できました");
                            console.dir(user_with_desTask);
                            console.dir(user_with_reqTask);
                            response.json(user_with_desTask);
                        }
                    });
                }
            })
        }
    },
    //
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
                        request.session.user = createdUser;

                        response.redirect('/user');
                    });
                } else {
                    console.log("特定のユーザーを取得できたのでログインします");
                    request.session.user = user;
                    response.redirect('/user');
                }
            });
        }
    },
};

module.exports = userController;
