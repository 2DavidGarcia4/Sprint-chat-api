import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";

class Sessions extends Model {
  public id!: string
  public userId!: string
  public endAt!: string | null
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
      model: UsersModel,
      key: 'id'
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