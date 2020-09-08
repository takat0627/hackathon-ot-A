'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = '';
    // 退室メッセージイベントを送信する
    socket.emit("sendExitEvent",userName)
    // 退室
    location.href = '/user';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitEvent', function (data, dtFormat) {
    $('#thread').prepend('<p>' +data+"さんが退出しました"+ '</p>');
    $('#thread').prepend('<p>-----' + dtFormat + '</p>');
});
