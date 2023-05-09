import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const ChatNotificationsModel = sequelize.define('chat_notifications', {
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
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  } 
})