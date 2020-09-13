'use strict';


function scrollToEnd() {
    const messagesArea = document.getElementById('msg_history');
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

var renderer = document.getElementById("msg_history");
//要素が変化したときの処理を書く(この場合は下までスクロール)
const observer = new MutationObserver((render) => {
  scrollToEnd();
});
//監視する条件を書く
//この場合、"msg_history"に子要素が追加されたとき
observer.observe(renderer, {
  childList: true,
});

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val().split('\n').join('<br>');

    // dataにユーザー名とメッセージをJSON化
    let data = { 'userName': userName, 'message': message, 'dtFormat': '', 'id': '' };

    // 投稿内容を送信
    socket.emit('sendMessageEvent', data);

    // 送信後フォーム内の入力値を空にする
    document.getElementById('message').value='';

    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('publishMessageEvent', function (data) {
    const myName = $('#userName').val();
    let userMessage = '<p>' + data.message + '</p>'
    if (myName === data.userName) {
        $('#msg_history').append('<div class="outgoing_msg"><div class="sent_msg"><div id="outgoing_msg' + data.id + '"></div><span class="time_date" id="outgoing_time_date' + data.id + '"></span></div></div>');
        $('#outgoing_msg' + data.id).append(userMessage);
        $('#outgoing_time_date' + data.id).append(data.dtFormat);
    }
    if (myName !== data.userName) {
        $('#msg_history').append('<div class="incoming_msg"><div class="incoming_msg_img"><img src = "https://ptetutorials.com/images/user-profile.png" alt = "sunil" > </div ><div class="received_msg">' + data.userName + '<div class="received_withd_msg"><div id="incoming_msg' + data.id + '"></div><span class="time_date" id="incoming_time_date' + data.id + '"></span></div></div></div > ')
        $('#incoming_msg').append('<p>' + `userName : ${data.userName}` + '</p >');
        $('#incoming_msg' + data.id).append(userMessage);
        $('#incoming_time_date' + data.id).append(data.dtFormat);
    }
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
$(function () {
    $('#message').keydown(function (event) {
        // 他のキーも割り当てればメモの投稿などもキーボードから可能
        if (event.metaKey && event.keyCode === 13) {
            console.log('Pushed command and enter key.');
            publish();
        }
    });
});