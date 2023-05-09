import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";

export const MessagesModel = sequelize.define('messages', {
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
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'author_id',
    references: {
      model: UsersModel,
      key: 'id'
    }
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