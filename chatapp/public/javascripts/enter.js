'use strict';

// 入室メッセージをサーバに送信する
function enter () {
    // 入力されたユーザ名を定義
    const userName = '';
    // 入室メッセージイベントを送信する
    socket.emit("sendEnterEvent",userName);
    // 入室
    location.href = '/room';
}

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterEvent', function (data, dtFormat) {
    $('#thread').prepend('<p>' + data + 'さんが入室しました' + '</p>');
    $('#thread').prepend('<p>-----' + dtFormat + '</p>');
});
