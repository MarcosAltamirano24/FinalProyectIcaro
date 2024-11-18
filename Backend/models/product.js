import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.OrderItem, { foreignKey: 'productId', as: 'orderItems' });
    }
  }

  Product.init(
    {
      name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: { 
        type: DataTypes.FLOAT, 
        allowNull: false,
        validate: {
          isFloat: true, 
          min: 0,
        }
      },
      stock: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0,
        allowNull: false,
        validate: {
          min: 0, 
        }
      },
      image: { 
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          isUrl: true,
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      }
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products', 
      timestamps: true,
    }
  );

  return Product;
};
