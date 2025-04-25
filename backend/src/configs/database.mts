import { Dialect, Sequelize } from 'sequelize';
import 'dotenv/config';

const dbName = process.env.DB_NAME || 'chatappdb';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbDialect: Dialect = (process.env.DB_DIALECT || 'mysql') as Dialect;

 const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: true, // Disable logging (optional)
});

let isConnected = false; // Flag to track connection

const connectDB = async () => {
  if (isConnected) {
    console.log('🔄 Using existing database connection.');
    return sequelize;
  }
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
    isConnected = true;
    return sequelize;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

export {sequelize,  connectDB };