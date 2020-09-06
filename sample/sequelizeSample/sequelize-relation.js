"use strict";

// 使用するSQLite3のDBは以下
// https://drive.google.com/file/d/0BzCcFSX0gJGkNFQya2ZIZ0xQelE/view?usp=sharing

/**
 * Sequelizeの導入
 */
var Sequelize = require("sequelize");

/**
 * SQLite3の読み込み
 */
var sequelize = new Sequelize(
  'database', '', '', {
  dialect: 'sqlite',
  storage: './sequelize-relation.db',
}
);

/**
 * データ型の宣言 テーブル名: places
 */
var Place = sequelize.define(
  "place",
  {
    name: Sequelize.STRING,
  },
  {
    // createdAt, updatedAtを自動的に入れないようにする
    timestamps: false,
  }
);

/**
 * データ型の宣言 テーブル名: prefectures
 */
var Prefecture = sequelize.define(
  "prefecture",
  {
    name: Sequelize.STRING,
  },
  {
    // createdAt, updatedAtを自動的に入れないようにする
    timestamps: false,
  }
);

/**
 * places.prefecture_id == prefectures.idとなるものを紐づけられるように指定
 * 1 prefecture あたりに N place が紐づくので、以下の表記。
 */
Place.belongsTo(Prefecture, { foreignKey: 'prefecture_id' });
Prefecture.hasMany(Place, { foreignKey: 'prefecture_id' });

var outputMethod = function (prefectures) {
  // JSONで出力
  console.log(JSON.stringify(prefectures));
}

var option = {
  include: [
    {
      model: Prefecture,
      separate: false, // Prefectureが1つしか入らないときは、separate:falseにすると、JSONObjectとして出力される
    },
  ]
};

// option.includeを指定すると、prefectureが入って取得される
Place.findAll(option).then(outputMethod);
//// 出力
//[
//  {
//    "id": 1,
//    "name": "札幌市時計台",
//    "prefecture_id": 1,
//    "prefecture": {
//      "id": 1,
//      "name": "北海道"
//    }
//  },
//  {
//    "id": 2,
//    "name": "青森県立三沢航空科学館",
//    "prefecture_id": 2,
//    "prefecture": {
//      "id": 2,
//      "name": "青森県"
//    }
//  }
//]

// [うまくいかない参考]option.includeを指定しないと、JOINされない
Place.findAll().then(outputMethod);
//// 出力
//[
//  {
//    "id": 1,
//    "name": "札幌市時計台",
//    "prefecture_id": 1
//  },
//  {
//    "id": 2,
//    "name": "青森県立三沢航空科学館",
//    "prefecture_id": 2
//  }
//]