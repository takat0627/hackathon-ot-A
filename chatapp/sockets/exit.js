'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitEvent', function (data) {
        console.log("退出ユーザー名:"+data);
        socket.broadcast.emit('receiveExitEvent', data);
    });
};
