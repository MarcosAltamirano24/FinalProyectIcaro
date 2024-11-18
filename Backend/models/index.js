import "dotenv/config";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const initializeModels = async () => {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  });

  for (const file of files) {
    const { default: initModel } = await import(
      new URL(`./${file}`, import.meta.url)
    );
    const model = initModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

await initializeModels();

export const { User, Product, Ticket, Order, OrderItem, CartItem } = db;
export default db;
