import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class Members extends DefaultModel {
  public id!: string
  public chatId!: string
  public memberId!: string
}

export const MembersModel = Members.init({
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
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: UsersModel,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'members'
})