import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";

export const FriendsRequestsModel = sequelize.define('friends_requests', {
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
})