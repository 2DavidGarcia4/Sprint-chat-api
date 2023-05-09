import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const FriendsRequestsModel = sequelize.define('friends_requests', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'sender_id'
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'receiver_id',
  },
  message: {
    type: DataTypes.STRING
  }
})