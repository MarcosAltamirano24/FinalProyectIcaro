module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'category', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('products', 'category');
  }
};