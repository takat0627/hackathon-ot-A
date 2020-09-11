'use strict';

function taskCreate() {
  // タスクタイトル取得
  let title = $('#title').val();
  let des_name = $('#des_name').val();
  let date = $('#date').val();

  // 項目が未入力でないかチェックする
  if ((title === "") || (des_name === "") || (date === "")) {
    alert("入力を完全にしてください");
  }
  //必須項目に入力がある場合はフォームを送信
  else {
    $('form').submit();
  }
}
