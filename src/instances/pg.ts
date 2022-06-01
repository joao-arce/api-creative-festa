import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// export const sequelize = new Sequelize(
//   process.env.PG_DB as string,
//   process.env.PG_USER as string,
//   process.env.PG_PASSWORD as string,
//   {
//     dialect: 'postgres',
//     port: parseInt(process.env.PG_PORT as string),
//   }
// );

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
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

export = sequelize;
