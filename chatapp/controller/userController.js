'use strict';
const dbModels = require('../models/');
const bcrypt = require('bcrypt')
let userController = {
    // 全体タスクを返すルーティングのメソッド
    showAllUsersWithTasks: function (request, response, next) {
        if (request.session.user === undefined) {
            response.redirect('/');
        } else {
            dbModels.User.findAll({
                include: {
                    model: dbModels.Task,
                    as: 'desTask',
                    include: {
                        model: dbModels.User,
                        as: 'reqUser'
                        //ユーザーに紐づいて受理タスクが取得できる、受理タスクには送信した側のユーザー名が入っていないので取得する必要がある。
                    }
                },
                /**
                 * #1
                 * モデル名を指定しない場合はfindAllとかしているテーブルでソートが可能
                 * ここではUserのIDでまず並べ変える（この後の締め切り順がユーザごとに行われるように）
                 * #2
                 * 次に結合後の中の何かで並べ替えるときは
                 * そのモデルをindex0，対象をindex1，オプションをindex2に記述することでソートが可能
                 *
                 *
                 * だと．おもっているのですが，ちゃんと並べ替えられるものとられないものがあって半泣きです．
                 * 個人タスクでも同様に並び替えられるものと並び替えられないものがいてギャン泣きです，
                 * ASCをDESCにすると逆に並び替えられていなかったものが並び変わります．なぜでしょう．．．
                 */
                order: [["id", 'ASC'], [{ model: dbModels.Task, as: 'desTask' }, 'deadline', 'ASC']],
            }).then(users => {
                if (!users) {
                    console.log("ユーザーデータを取得できませんでした");
                } else {
                    console.log("ユーザーが取得できました")
                    console.dir(users[0].desTask[0]);
                    console.dir(users[0].desTask[0].reqUser);
                    console.log('user1\'s task1 deadline : ', users[0].desTask[0].deadline);
                    console.log('user1\'s task1 <-', users[0].desTask[0].reqUser.name);
                    response.render('task', { userName: request.session.user.name, user: users });

                }
            })
        }
    },
    // 個人タスクを返すルーティングのメソッド
    showUsersTasks: function (request, response, next) {
        if (request.session.user === undefined) {
            response.redirect('/');
        } else {
            // requestからユーザー情報を取得する
            dbModels.User.findByPk(request.session.user.id, {
                include: [
                    {
                        model: dbModels.Task,
                        as: 'desTask',
                        // 依頼された人
                        include: {
                            model: dbModels.User,
                            as: 'reqUser'
                        }
                    }
                ],
                // なぜなんだぁ
                order: [[{ model: dbModels.Task, as: 'desTask' }, 'deadline', 'ASC']],
            }).then(user_with_desTask => {
                if (!user_with_desTask) {
                    console.log("ユーザーデータを取得できませんでした");
                } else {
                    console.log("ユーザーが取得できました");
                    // desTaskを持ったUser
                    dbModels.User.findByPk(request.session.user.id, {
                        include: [
                            {
                                model: dbModels.Task,
                                as: 'reqTask',
                                // 依頼した人
                                include: {
                                    model: dbModels.User,
                                    as: 'desUser'
                                }
                            }
                        ],
                        // なぜだぁ．．．
                        order: [[{ model: dbModels.Task, as: 'reqTask' }, 'deadline', 'ASC']],
                    }).then(user_with_reqTask => {
                        if (!user_with_reqTask) {
                            console.log("ユーザーデータを取得できませんでした");
                        } else {
                            console.log("ユーザーが取得できました");
                            console.log(user_with_desTask);
                            console.log(user_with_reqTask);
                            // response.json({desTask:user_with_desTask,reqTask:user_with_reqTask});
                            response.render('user', {
                                userName: request.session.user.name,
                                user_with_desTask: user_with_desTask,
                                user_with_reqTask: user_with_reqTask
                            });
                        }
                    });
                }
            })
        }
    },

    // 自分以外の全ユーザーを取得
    ShowAllUsers: function (request, response, next) {
        if (request.session.user === undefined) {
            response.redirect('/');
        } else {
            dbModels.User.findAll().then(user => {
                console.log(request.session.user.name);
                console.log(user[0]);
                response.render('create-task', {
                    myUserName: request.session.user.name,
                    allUser: user
                });
            })
        }
    },

    // 自分以外の全ユーザーを取得
    ShowAllUsersUpdate: function (request, response, next) {
        if (request.session.user === undefined) {
            response.redirect('/');
        } else {
            dbModels.User.findAll().then(user => {
                // console.log(request.session.user.name);
                // console.log(user[0]);
                console.log(request.params.id);
                response.render('update-task', {
                    myUserName: request.session.user.name,
                    allUser: user,
                    taskId: request.params.id
                });
            })
        }
    },

    // ログインしたユーザーを適切に処理してユーザーの名前を返す.　router.post('/user')で使用
    loginByName: function (request, response, next) {

        let userName = request.body.userName;
        let userPass = request.body.userPass;
        let userPassHash = bcrypt.hashSync(userPass, bcrypt.genSaltSync(8));

        console.log(bcrypt.compareSync("hoge", userPassHash));
        console.log(bcrypt.compareSync("secret2", userPassHash));
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
                        name: userName,
                        password: userPassHash,
                    }).then(createdUser => {
                        request.session.user = createdUser;

                        response.redirect('/user');
                    });
                } else {
                    if (bcrypt.compareSync(userPass, user.password)) {
                        console.log("特定のユーザーを取得できたのでログインします");
                        request.session.user = user;
                        response.redirect('/user');
                    } else {
                        response.redirect('/');
                    }
                }
            });
        }
    },
};

module.exports = userController;
