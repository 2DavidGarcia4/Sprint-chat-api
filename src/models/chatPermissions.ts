import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const ChatPermissionsModel = sequelize.define('chat_permissions', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'chat_id'
  },
  memberId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'member_id'
  },
  permissionLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'permission_level'
  }
})