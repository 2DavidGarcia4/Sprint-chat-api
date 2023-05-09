import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const UsesModel = sequelize.define('uses', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id'
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
})