'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    // 期限のフォーマット:yyyy-mm-dd hh:mm:ss
    await queryInterface.bulkInsert('Tasks', [{
      title: '会社A訪問',
      info: '会社Aのりんごさんに新商品のプレゼン',
      reqUserId: 1,
      desUserId: 2,
      deadline: '2020-9-10 12:00:00',
      done: 0
    }], {});

    await queryInterface.bulkInsert('Tasks', [{
      title: '会社B訪問',
      info: '会社Bのりんごさんに新商品のプレゼン',
      reqUserId: 1,
      desUserId: 2,
      deadline: '2020-9-9 12:00:00',
      done: 0
    }], {});

    await queryInterface.bulkInsert('Tasks', [{
      title: '会社C訪問',
      info: '会社Cのりんごさんに新商品のプレゼン',
      reqUserId: 2,
      desUserId: 1,
      deadline: '2020-9-8 12:00:00',
      done: 0
    }], {});

    // sample2
    await queryInterface.bulkInsert('Tasks', [{
      title: 'SPAD論文執筆',
      info: 'SPADイメージングの論文を執筆し学会に寄稿する',
      reqUserId: 3,
      desUserId: 1,
      deadline: '2020-9-14 18:00:00',
      done: 0
    }], {});

    // sample3
    await queryInterface.bulkInsert('Tasks', [{
      title: '新規プロジェクト立ち上げ',
      info: '新規プロジェクトであるXXXを立ち上げる',
      reqUserId: 2,
      desUserId: 3,
      deadline: '2020-10-1 12:00:00',
      done: 0
    }], {});
    
    // sample4
    await queryInterface.bulkInsert('Tasks', [{
      title: 'Word2Vecの導入',
      info: '現在のシステムで蓄積された文章コーパスを用いて単語の分散表現を獲得する',
      reqUserId: 4,
      desUserId: 5,
      deadline: '2020-9-17 15:00:00',
      done: 0
    }], {});

    // sample5
    await queryInterface.bulkInsert('Tasks', [{
      title: '音声認識性能の向上',
      info: '現在システムで採用している音声認識技術の性能向上を行う．',
      reqUserId: 4,
      desUserId: 6,
      deadline: '2020-9-15 13:00:00',
      done: 0
    }], {});

    // sample6
    await queryInterface.bulkInsert('Tasks', [{
      title: 'データの整形',
      info: '現在のシステムで蓄積されたデータを扱いやすいように整形する．',
      reqUserId: 5,
      desUserId: 6,
      deadline: '2020-9-17 15:00:00',
      done: 0
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
