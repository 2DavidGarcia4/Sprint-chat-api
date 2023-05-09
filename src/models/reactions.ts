import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const ReactionsModel = sequelize.define('reactions', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'author_id'
  },
  messageId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'message_id'
  },
  emoji: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  users: {
    type: DataTypes.ARRAY(DataTypes.UUID)
  }
})