/* jQueryのセレクタを使って要素の取得や代入を行う */

// 要素の値を取得する
// テキストフォーム（id=text1）のvalueを取得する
function getValue() {
    const text1Value = $('#text1').val();
    return text1Value;
}

// フォームに値が設定されている場合にポップアップを表示する
function popupValue() {
    const text1Value = getValue();
    // ここに条件分岐を記入する
    // テキストボックスの中身が空白じゃなければ -> 空なら何も処理を実行しない
    if (text1Value!== ""){
        alert(text1Value);
    }
}

// 要素に値をセットする
// getの逆で，値をdivタグ（id=text2）に代入する．
function setValue() {
    const text2Value = 'Rakus!';
    $('#text2').text(text2Value);
}
