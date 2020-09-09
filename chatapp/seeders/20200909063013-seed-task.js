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

    await queryInterface.bulkInsert('Tasks', [{
      title: '会社A訪問',
      info: '会社Aのりんごさんに新商品のプレゼン',
      reqUserId: 1,
      desUserId: 2,
      done: 0
    }], {});

    // sample2
    await queryInterface.bulkInsert('Tasks', [{
      title: 'SPAD論文執筆',
      info: 'SPADイメージングの論文を執筆し学会に寄稿する',
      reqUserId: 3,
      desUserId: 1,
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
