import { sequelize } from "../utils/database";
import { DataTypes } from "sequelize";
import { DefaultModel } from "../utils/functions";
import { MessagesModel } from "./messages";
import { UsersModel } from "./users";

class DeletedMessages extends DefaultModel {
  public id!: string
  public messageId!: string
  public deletedBy!: string
}

export const DeletedMessagesModel = DeletedMessages.init({
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
  deletedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: 'id',
      model: UsersModel
    }
  }
}, {
  sequelize,
  modelName: 'deleted_messages',
  tableName: 'deleted_messages'
})