import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
      OrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }

  OrderItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0, 
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
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
      modelName: 'OrderItem',
      tableName: 'order_items',
      timestamps: true,
    }
  );

  return OrderItem;
};
