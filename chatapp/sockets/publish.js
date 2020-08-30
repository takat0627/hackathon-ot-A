'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    // クライアントから'sendMessageEvent'が送られてくる
    socket.on('sendMessageEvent', function (userName, message) {
        if (!message) {
            return;
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
