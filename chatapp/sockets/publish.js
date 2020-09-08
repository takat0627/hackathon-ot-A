'use strict';

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
        data.dtFormat  = dt.toFormat('DDD MMM DD YYYY HH24:MI:SS');

        data.id=count;
        count++;

        // 最終投稿ユーザー
        console.log('最終投稿ユーザー: '+ lastUser);
            console.log('client\'s name: ' + data.userName);
            console.log('client\'s message: ' + data.message);
            console.log('sucess!\n')
            // ここで投稿メッセージを送信する
            io.sockets.emit('publishMessageEvent', data);
            // 最終投稿ユーザーを更新
            lastUser = data.userName;
        
    });
};
