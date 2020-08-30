'use strict';

// 最後に投稿したユーザー
var lastuser = '';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    // クライアントから'sendMessageEvent'が送られてくる
    socket.on('sendMessageEvent', function (data) {

        // 投稿した日時を取得
        let dt = new Date();
        let dtFormat = dt.toFormat('DDD MMM DD YYYY HH24:MI:SS');

        //最終投稿ユーザー
        console.log('最終投稿ユーザー: '+lastuser);

        //最終投稿ユーザーと現在のユーザーが一致しない場合に投稿
        if (lastuser !== data.userName) {

            console.log('client\'s name: ' + data.userName);
            console.log('client\'s message: ' + data.message);
            console.log('client\'s date: ' + dtFormat);
            console.log('sucess!\n');

            // ここで投稿メッセージを送信する
            io.sockets.emit('publishMessageEvent', data, dtFormat);
            // 最終投稿ユーザーを更新
            lastuser = data.userName;
        }

        if (!message.replace(/\s/g, '').length) {
            console.log("this string is only include space or line breaks");
            return;
        }

        console.log('client\'s name: ' + userName);
        console.log('client\'s message: ' + message);
        console.log('sucess!\n')
        // ここで投稿メッセージを送信する
        io.sockets.emit('publishMessageEvent', userName, message);

    });
};
