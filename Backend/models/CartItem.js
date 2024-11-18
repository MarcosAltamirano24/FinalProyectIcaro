import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }

  CartItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'CartItem',
      tableName: 'cart_items',
      timestamps: true,
    }
  );

  return CartItem;
};
