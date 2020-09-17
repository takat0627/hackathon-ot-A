'use strict';

// ログイン確認
function login() {
    // 入力されたユーザ名を取得する
    const userName = $('#userName').val();
    const userPass = $('#userPass').val();

    // ユーザ名が未入力でないかチェックする
    if (userName === "") {
        alert("ユーザー名を入力してください");
    }
    if (userPass === "") {
        alert("ユーザーパスワードを入力してください");
    }

    //ユーザー名に入力がある場合はフォームを送信
    else {
        $('form').submit();
    }
}
