import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class FriendsRequests extends DefaultModel {
  public id!: string
  public senderId!: string
  public receiverId!: string
  public message!: string | null
}

export const FriendsRequestsModel = FriendsRequests.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'sender_id',
    references: {
      model: UsersModel,
      key: 'id'
    }
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'receiver_id',
    references: {
      model: UsersModel,
      key: 'id'
    }
  },
  message: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'friends_requests'
})