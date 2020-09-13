'use strict';
// use sequelize
const dbModels = require('../models/');
const db = require('../models/');

// 最後に投稿したユーザー
let lastUser = ''



// 受信投稿メッセージ識別(id)のためのカウント変数
let count=0;


module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    // クライアントから'sendMessageEvent'が送られてくる
    socket.on('sendMessageEvent', function (data) {
        if (!data.message) {
            return;
        }
        // 空行と改行だけで構成されていた場合失敗
        if (!data.message.replace(/\s/g, '').length) {
            console.log("this string is only include space or line breaks");
            return;
        }

        // 投稿した日時を取得
        let dt = new Date();
        data.dtFormat  = dt.toFormat('YYYY年MM月DD日　HH24時MI分SS秒');

        data.id=count;
        count++;

        // 最終投稿ユーザー
        console.log('最終投稿ユーザー: '+ lastUser);
        console.log('client\'s name: ' + data.userName);
        console.log('client\'s message: ' + data.message);
        console.log('sucess!\n')

        dbModels.User.findOne({
            where: { name: data.userName }
        }).then(user => {
            if (!user) {
                console.log("おかしいね");
            } else {
                dbModels.Chat.create({
                    content: data.message,
                    userId: user.id
                }).then(() => {
                    console.log("チャット履歴成功");
                })
            }
        })
        // ここで投稿メッセージを送信する
        io.sockets.emit('publishMessageEvent', data);
        // 最終投稿ユーザーを更新
        lastUser = data.userName;

    });
};
