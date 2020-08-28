'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterEvent', function (data) {
        console.log('入室ユーザ名：' + data);
        socket.broadcast.emit('receiveEnterEvent', data);
    });
};
