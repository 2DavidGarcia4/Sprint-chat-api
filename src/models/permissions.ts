import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class Permissions extends DefaultModel {
  public id!: string
  public chatId!: string
  public userId!: string
  public permissionLevel!: number
}

export const PermissionsModel = Permissions.init({
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
      key: 'id',
      model: UsersModel,
    }
  },
  permissionLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'permission_level'
  }
}, {
  sequelize,
  modelName: 'permissions',
  tableName: 'permissions'
})