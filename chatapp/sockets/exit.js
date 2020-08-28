'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する

    require('date-utils');
    let dt = new Date();
    let dtFormat = dt.toFormat('DDD MMM DD YYYY HH24:MI:SS');

    socket.on('sendExitEvent', function (data) {
        console.log("退出ユーザー名:" + data);
        socket.broadcast.emit('receiveExitEvent', data, dtFormat);
    });
};
