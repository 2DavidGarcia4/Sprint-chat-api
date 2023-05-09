import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const ChatsModel = sequelize.define('chats', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.UUID,
    field: 'owner_id'
  },
  iconUrl: {
    type: DataTypes.TEXT,
    validate: {
      isUrl: true
    },
    field: 'icon_url'
  },
  description: {
    type: DataTypes.STRING
  },
  lastMessageId: {
    type: DataTypes.UUID,
  }
})