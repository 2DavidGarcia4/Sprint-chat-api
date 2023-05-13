import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class Messages extends DefaultModel {
  public id!: string
  public chatId!: string
  public authorId!: string
  public content!: number
  public edited!: boolean
  public referenceId!: string | null
}

export const MessagesModel = Messages.init({
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
      key: 'id',
      model: UsersModel
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
}, {
  sequelize,
  modelName: 'messages'
})