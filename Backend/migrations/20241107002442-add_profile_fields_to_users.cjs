'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'surname', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'city', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'postalCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'surname');
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.removeColumn('Users', 'city');
    await queryInterface.removeColumn('Users', 'postalCode');
  }
};
