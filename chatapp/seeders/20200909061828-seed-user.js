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

    // sample1
    await queryInterface.bulkInsert('Users', [{
      name: 'RyoW',
    }], {});

    // sample2
    await queryInterface.bulkInsert('Users', [{
      name: 'Antony',
    }], {});

    // sample3
    await queryInterface.bulkInsert('Users', [{
      name: 'Funatomi',
    }], {});

    // sample4
    await queryInterface.bulkInsert('Users', [{
      name: 'takashima',
    }], {});

    // sample5
    await queryInterface.bulkInsert('Users', [{
      name: 'inoue',
    }], {});

    // sample6
    await queryInterface.bulkInsert('Users', [{
      name: 'tokitsu',
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
