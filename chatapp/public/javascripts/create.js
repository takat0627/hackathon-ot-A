'use strict';

// ログイン確認
function create() {
    // 入力されたユーザ名を取得する
    let title = $('#title').val();
    let des = $('#des').val();
    let date = $('#date').val();

    // ユーザ名が未入力でないかチェックする
    if ((title === "") || (des === "") || (date === "")) {
        alert("入力を完全にしてください");
    }
    //ユーザー名に入力がある場合はフォームを送信
    else{
        $('form').submit();
    }
}
