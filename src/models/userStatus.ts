import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { DefaultModel } from "../utils/functions";
import { UsersModel } from "./users";

class UserStatus extends DefaultModel {
  public id!: string
  public userId!: string
  public status!: number
  public emoji!: string | null
  public message!: string | null
}

export const UserStatusModel = UserStatus.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      key: 'id',
      model: UsersModel
    }
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  emoji: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'user_status',
  tableName: 'user_status'
})