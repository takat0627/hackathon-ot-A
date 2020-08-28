'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    require('date-utils');
    let dt = new Date();
    let dtFormat = dt.toFormat('DDD MMM DD YYYY HH24:MI:SS');

    socket.on('sendEnterEvent', function (data) {
        console.log('入室ユーザ名：' + data);
        socket.broadcast.emit('receiveEnterEvent', data, dtFormat);
    });
};
