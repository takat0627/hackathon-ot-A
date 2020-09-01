'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val().split('\n').join('<br>');

    // dataにユーザー名とメッセージをJSON化
    let data = { 'userName': userName, 'message': message, 'dtFormat': '' };

    // 投稿内容を送信
    socket.emit('sendMessageEvent', data);

    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('publishMessageEvent', function (data) {
    const myName = $('#userName').val();
    let userMessage = '<p>' + data.message + '</p>'
    if (myName !== data.userName) {
        // タグに追加するスタイル
        const newStyle = `style=\"color: blue;\"`
        userMessage = '<p ' + newStyle + ' >' + data.message + '</p >'
    }
    $('#thread').append('<p>' + `userName : ${data.userName}` + '</p >');
    $('#thread').append(userMessage);
    $('#thread').append('<p>' + `date : ${data.dtFormat}` + '</p>');
});


/* 
    - “テキストフォーム選択時”にCommand+Enterキーで投稿
    
    Enterキーは改行で使うからここは取り合えずよく使うcmd+Enterで設定
    (キーコード)
    Enter : 13
    コマンド：54(右), 55(左)，ただし，これらはevent.metaKeyで指定できる

    // 参考
    https://developer.mozilla.org/ja/docs/Web/API/KeyboardEvent
*/
$(function(){
    $('#message').keydown(function(event){
        // 他のキーも割り当てればメモの投稿などもキーボードから可能
        if(event.metaKey && event.keyCode === 13){
            console.log('Pushed command and enter key.');
            publish();
        }
    });
});