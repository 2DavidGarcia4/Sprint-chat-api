import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class ChatNotifications extends DefaultModel {
  public id!: string
  public chatId!: string
  public memberId!: string
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
  memberId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'member_id',
    references: {
      model: UsersModel,
      key: 'id'
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