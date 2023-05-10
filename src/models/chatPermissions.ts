import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";

class ChatPermissions extends Model{
  public id!: string
  public chatId!: string
  public memberId!: string
  public permissionLevel!: number
}

export const ChatPermissionsModel = ChatPermissions.init({
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
  permissionLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'permission_level'
  }
}, {
  sequelize,
  tableName: 'chat_permissions'
})