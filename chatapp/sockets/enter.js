'use strict';

require('date-utils');

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterEvent', function (data) {
        let dt = new Date();
        let dtFormat = dt.toFormat('DDD MMM DD YYYY HH24:MI:SS');
        console.log('入室ユーザ名：' + data);
        socket.broadcast.emit('receiveEnterEvent', data, dtFormat);
    });
};
