'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する

    // ここは入室時と共通か？
    // require('date-utils');
    // let dt = new Date();
    
    socket.on('sendExitEvent', function (data) {
        let dt = new Date();
        let dtFormat = dt.toFormat('DDD MMM DD YYYY HH24:MI:SS');
        console.log("退出ユーザー名:" + data);
        socket.broadcast.emit('receiveExitEvent', data, dtFormat);
    });
};
