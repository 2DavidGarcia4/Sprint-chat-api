import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const PinnedMessagesModel = sequelize.define('pinned_messages', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'chat_id'
  },
  messageId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'message_id'
  },
  author: {
    type: DataTypes.UUID,
    allowNull: false
  }
})