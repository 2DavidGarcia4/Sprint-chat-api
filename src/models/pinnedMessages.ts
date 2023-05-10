import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { MessagesModel } from "./messages";
import { UsersModel } from "./users";

class PinnedMessages extends Model {
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
}, {
  sequelize,
  modelName: 'pinned_messages'
})