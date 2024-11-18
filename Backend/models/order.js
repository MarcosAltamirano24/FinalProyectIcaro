import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
    }
  }

  Order.init(
    {
      status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Canceled'),
        allowNull: false,
        defaultValue: 'Pending',
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isFloat: true, 
          min: 0,  
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
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: true,
      hooks: {
        beforeCreate: async (order, options) => {
          const user = await sequelize.models.User.findByPk(order.userId);
          if (!user) {
            throw new Error('Usuario no encontrado.');
          }
          if (user.role === 'admin') {
            throw new Error('Los administradores no pueden realizar órdenes de compra.');
          }
        },
      },
    }
  );

  return Order;
};
