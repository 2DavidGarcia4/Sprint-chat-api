import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";
import { MessagesModel } from "./messages";
import { DefaultModel } from "../utils/functions";

class Reactions extends DefaultModel{
  public id!: string
  public authorId!: string
  public messageId!: string
  public emoji!: string
  public amount!: number
  public users!: string[]
}

export const ReactionsModel = Reactions.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'author_id',
    references: {
      model: UsersModel,
      key: 'id'
    }
  },
  messageId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'message_id',
    references: {
      model: MessagesModel,
      key: 'id'
    }
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
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: []
  }
}, {
  sequelize,
  modelName: 'reactions'
})