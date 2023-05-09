import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";

export const SessionsModel = sequelize.define('sessions', {
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
  endAt: {
    type: DataTypes.DATE,
    field: 'end_at'
  }
})