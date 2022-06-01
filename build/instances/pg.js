"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// export const sequelize = new Sequelize(
//   process.env.PG_DB as string,
//   process.env.PG_USER as string,
//   process.env.PG_PASSWORD as string,
//   {
//     dialect: 'postgres',
//     port: parseInt(process.env.PG_PORT as string),
//   }
// );
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
sequelize
    .authenticate()
    .then(() => console.log('Connection established successfully.'))
    .catch((err) => console.log('Unuble to conect to database'));
module.exports = sequelize;
