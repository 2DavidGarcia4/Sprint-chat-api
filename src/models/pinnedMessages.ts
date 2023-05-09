import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { MessagesModel } from "./messages";
import { UsersModel } from "./users";

export const PinnedMessagesModel = sequelize.define('pinned_messages', {
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
  messageId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'message_id',
    references: {
      model: MessagesModel,
      key: 'id'
    }
  },
  author: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: UsersModel,
      key: 'id'
    }
  }
})