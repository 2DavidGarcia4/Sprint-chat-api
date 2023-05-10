import { DataTypes, ModelStatic, Model, InferAttributes, Options, ModelDefined, Optional } from "sequelize";
import { sequelize } from "../utils/database";
import { UsersModel } from "./users";

class Uses extends Model {
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
      model: UsersModel,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  sequelize,
  tableName: 'uses',
});