// src/configs/syncDB.mts
import { sequelize } from './database.mjs';
import User from '../models/UserModel.mjs';
import Message from '../models/MessageModel.mjs';
import { initializeAssociations } from '../models/associations.mjs';

const syncDB = async () => {
  try {
    // Initialize associations before syncing
    initializeAssociations();
    
    // Sync the database
    await sequelize.sync({ alter: true });
    console.log('🔄 Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
    throw error;
  }
};

export default syncDB;