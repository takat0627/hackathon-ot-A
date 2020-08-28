'use strict';

// 入室メッセージをサーバに送信する

// 入力されたユーザ名を取得する
const userName = $('#userName').val();
// 入室メッセージイベントを送信する
socket.emit("sendEnterEvent",userName)

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterEvent', function (data, dtFormat) {
    $('#thread').prepend('<p>' + data + 'さんが入室しました' + '</p>');
    $('#thread').prepend('<p>-----' + dtFormat + '</p>');
});
