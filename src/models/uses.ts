import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";

export const UsesModel = sequelize.define('uses', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: UsersModel,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
})