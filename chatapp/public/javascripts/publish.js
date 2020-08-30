'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val().split('\n').join('<br>');

    if (!message) {
        return;
    }	      

    if (!message.replace(/\s/g, '').length) {
        // dataにユーザー名とメッセージをJSON化
        var data = { 'userName': userName, 'message': message };
        socket.emit('sendMessageEvent', data);
        console.log("this string is only include space or line breaks");
        return;
    }

    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('publishMessageEvent', function (data, dtFormat) {
    $('#thread').prepend('<p>' + `${data.userName}`);
    $('#thread').prepend('<p>' + `${data.message}` + '</p>');
    $('#thread').prepend('<p>' + `${dtFormat}` + '</p>');
});