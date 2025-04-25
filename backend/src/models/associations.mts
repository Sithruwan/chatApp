// src/models/associations.mts
import User from "./UserModel.mjs";
import Message from "./MessageModel.mjs";

// Define associations
Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Message, { foreignKey: 'userId', as: 'messages' });

export const initializeAssociations = () => {
  // This function can be called to ensure associations are set up
};