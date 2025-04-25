// src/models/UserModel.mts
import { DataTypes, Model } from 'sequelize';
import { User as UserType } from '../types/index.mjs';
import { sequelize } from '../configs/database.mjs';

class User extends Model<UserType> implements UserType {
  
  public name!: string;
 
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'users',
    sequelize,
  }
);

export default User;