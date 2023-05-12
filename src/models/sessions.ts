import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class Sessions extends DefaultModel {
  public id!: string
  public userId!: string
  public endAt!: Date | null
}

export const SessionsModel = Sessions.init({
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
  endAt: {
    type: DataTypes.DATE,
    field: 'end_at'
  }
}, {
  sequelize,
  modelName: 'sessions',
})