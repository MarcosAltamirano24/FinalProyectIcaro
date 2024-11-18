'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { 
        type: Sequelize.STRING, 
        allowNull: false,
      },
      surname: { 
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true,
        validate: {
          isEmail: true, 
        },
      },
      password: { 
        type: Sequelize.STRING, 
        allowNull: false,
      },
      phone: { 
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: { 
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: { 
        type: Sequelize.STRING,
        allowNull: true,
      },
      postalCode: { 
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: { 
        type: Sequelize.ENUM('user', 'admin'), 
        allowNull: false,
        defaultValue: 'user',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
