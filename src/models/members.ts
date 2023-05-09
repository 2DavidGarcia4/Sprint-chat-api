import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";

export const MembersModel = sequelize.define('members', {
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
  }
})