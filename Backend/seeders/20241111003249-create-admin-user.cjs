'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      surname: 'User',
      email: 'admin@example.com',
      password: '1234',
      phone: '1234567890',
      address: '123 Admin St',
      city: 'AdminCity',
      postalCode: '12345',
      country: 'Countryland',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});
  }
};

