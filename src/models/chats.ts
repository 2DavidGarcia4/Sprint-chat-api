import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class Chats extends DefaultModel {
  public id!: string
  public name!: string | null
  public type!: number
  public ownerId!: string
  public iconUrl!: string | null
  public description!: string | null
  public lastMessageId!: string
  public users?: any[]
}

export const ChatsModel = Chats.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.UUID,
    field: 'owner_id',
    references: {
      model: UsersModel,
      key: 'id'
    }
  },
  iconUrl: {
    type: DataTypes.TEXT,
    validate: {
      isUrl: true
    },
    field: 'icon_url'
  },
  description: {
    type: DataTypes.STRING
  },
  lastMessageId: {
    type: DataTypes.UUID,
  }
}, {
  sequelize,
  modelName: 'chats'
})