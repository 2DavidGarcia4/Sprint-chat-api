import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class ChatNotifications extends DefaultModel {
  public id!: string
  public chatId!: string
  public userId!: string
  public disabled!: boolean
  public amount!: number
}

export const ChatNotificationsModel = ChatNotifications.init({
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
      model: UsersModel
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
}, {
  sequelize,
  modelName: 'chat_notifications'
})