import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const MembersModel = sequelize.define('members', {
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'chat_id'
  },
  memberId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'member_id'
  }
})