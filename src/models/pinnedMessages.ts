import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { MessagesModel } from "./messages";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class PinnedMessages extends DefaultModel {
  public id!: string
  public chatId!: string
  public messageId!: string
  public author!: string
}

export const PinnedMessagesModel = PinnedMessages.init({
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
      key: 'id',
      model: ChatsModel
    }
  },
  messageId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'message_id',
    references: {
      key: 'id',
      model: MessagesModel
    }
  },
  author: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: 'id',
      model: UsersModel
    }
  }
}, {
  sequelize,
  modelName: 'pinned_messages',
  tableName: 'pinned_messages'
})