import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'riUJvHKcirUTXEILu05R',
  database: 'railway',
  host: process.env.DB_HOST || 'containers-us-west-154.railway.app',
  port: Number(process.env.DB_PORT) || 6384,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
