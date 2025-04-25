// src/models/MessageModel.mts
import { DataTypes, Model } from 'sequelize';
import { Message as MessageType } from '../types/index.mjs';
import { sequelize } from '../configs/database.mjs';

class Message extends Model implements MessageType {
  declare id: number; 
  public content!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Reference the table name directly
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    tableName: 'messages',
    sequelize,
  }
);

export default Message;