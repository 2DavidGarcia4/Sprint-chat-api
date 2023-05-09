import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";

export const ChatNotificationsModel = sequelize.define('chat_notifications', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'chat_id',
    references: {
      model: ChatsModel,
      key: 'id'
    }
  },
  memberId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'member_id',
    references: {
      model: UsersModel,
      key: 'id'
    }
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