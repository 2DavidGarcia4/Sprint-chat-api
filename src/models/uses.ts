import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";
import { DefaultModel } from "../utils/functions";

class Uses extends DefaultModel {
  public id!: string
  public userId!: string
  public amount!: number
}

export const UsesModel = Uses.init({
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
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  sequelize,
  modelName: 'uses',
  tableName: 'uses'
});