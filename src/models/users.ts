import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { DefaultModel } from "../utils/functions";


class Users extends DefaultModel {
  public id!: string
  public name!: string | null
  public email!: string
  public about!: string | null
  public friends!: string[]
  public password!: string
  public avatarUrl!: string | null
  public userName!: string
  public phoneNumber!: string | null

  public status!: {
    id: string
    type: number
    emoji: string | null
    message: string | null
  }
  public blockedUsers!: string[]
  public archivedChats!: string[]
  public chats?: string[]
}

export const UsersModel = Users.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(60),
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  about: {
    type: DataTypes.STRING,
  },
  friends: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: []
  },
  color: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  avatarUrl: {
    type: DataTypes.TEXT,
    field: 'avatar_url'
  },
  userName: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
    field: 'user_name'
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number'
  },
  blockedUsers: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: [],
    field: 'blocked_users'
  },
  archivedChats: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: [],
    field: 'archived_chats'
  }
},
  {
    sequelize,
    modelName: 'users',
    tableName: 'users'
  }
)