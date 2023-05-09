import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const MessagesModel = sequelize.define('messages', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'chat_id'
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'author_id'
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  referenceId: {
    type: DataTypes.UUID,
    field: 'reference_id'
  }
})