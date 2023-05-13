import { DefaultModel } from "../utils/functions";
import { sequelize } from "../utils/database";
import { DataTypes } from "sequelize";
import { MessagesModel } from "./messages";
import { UsersModel } from "./users";

class MessagesReads extends DefaultModel {
  public id!: string
  public messageId!: string
  public userId!: string
  public read!: boolean
}

export const MessagesReadsModel = MessagesReads.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  messageId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: 'id',
      model: MessagesModel
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: 'id',
      model: UsersModel
    }
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'messages_reads',
  tableName: 'messages_reads'
}) 