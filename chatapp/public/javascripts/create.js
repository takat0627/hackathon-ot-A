'use strict';

// タスク作成-項目入力確認関数
function create() {
    // タスクタイトル取得
    let title = $('#title').val();
    let des = $('#des').val();
    let date = $('#date').val();

    // 項目が未入力でないかチェックする
    if ((title === "") || (des === "") || (date === "")) {
        alert("入力を完全にしてください");
    }
    //必須項目に入力がある場合はフォームを送信
    else{
        $('form').submit();
    }
}
