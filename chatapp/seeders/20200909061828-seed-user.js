'use strict';
const bcrypt = require('bcrypt');
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
      password: bcrypt.hashSync('secret1', bcrypt.genSaltSync(8)),
    }], {});

    // sample2
    await queryInterface.bulkInsert('Users', [{
      name: 'Antony',
      password: bcrypt.hashSync('secret2', bcrypt.genSaltSync(8)),
    }], {});

    // sample3
    await queryInterface.bulkInsert('Users', [{
      name: 'Funatomi',
      password: bcrypt.hashSync('secret3', bcrypt.genSaltSync(8)),
    }], {});

    // sample4
    await queryInterface.bulkInsert('Users', [{
      name: 'takashima',
      password: bcrypt.hashSync('secret4', bcrypt.genSaltSync(8)),
    }], {});

    // sample5
    await queryInterface.bulkInsert('Users', [{
      name: 'inoue',
      password: bcrypt.hashSync('secret5', bcrypt.genSaltSync(8)),
    }], {});

    // sample6
    await queryInterface.bulkInsert('Users', [{
      name: 'tokitsu',
      password: bcrypt.hashSync('secret6', bcrypt.genSaltSync(8)),
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
