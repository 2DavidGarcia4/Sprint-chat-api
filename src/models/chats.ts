import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";

export const ChatsModel = sequelize.define('chats', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
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
    field: 'owner_id',
    references: {
      model: UsersModel,
      key: 'id'
    }
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