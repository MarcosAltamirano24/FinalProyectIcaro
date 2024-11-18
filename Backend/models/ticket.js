import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Ticket.hasMany(models.OrderItem, { foreignKey: 'ticketId', as: 'orderItems' });
    }
  }

  Ticket.init(
    {
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
      total: { 
        type: DataTypes.FLOAT, 
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0  
        }
      },
      status: { 
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      sequelize, 
      modelName: 'Ticket',
      tableName: 'tickets', 
      timestamps: true, 
    }
  );

  return Ticket;
};
