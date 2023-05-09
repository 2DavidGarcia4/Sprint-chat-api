import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const SessionsModel = sequelize.define('sessions', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id'
  },
  endAt: {
    type: DataTypes.DATE,
    field: 'end_at'
  }
})