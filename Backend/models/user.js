import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Ticket, { foreignKey: 'userId', as: 'tickets' });
      User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
    }
  }

  User.init(
    {
      name: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      surname: { 
        type: DataTypes.STRING,
        allowNull: true
      },
      email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      phone: { 
        type: DataTypes.STRING,
        allowNull: true
      },
      address: { 
        type: DataTypes.STRING,
        allowNull: true 
      },
      city: { 
        type: DataTypes.STRING,
        allowNull: true 
      },
      postalCode: { 
        type: DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: { 
        type: DataTypes.ENUM('user', 'admin'), 
        defaultValue: 'user' 
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
    }
  );

  return User;
};

