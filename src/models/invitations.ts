import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";
import { ChatsModel } from "./chats";
import { UsersModel } from "./users";

export const InvitationsModel = sequelize.define('invitations', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  groupId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'group_id',
    references: {
      model: ChatsModel,
      key: 'id'
    }
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'created_by',
    references: {
      model: UsersModel,
      key: 'id'
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uses: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  maxAge: {
    type: DataTypes.INTEGER,
    defaultValue: 24*60*60,
    field: 'max_age'
  },
  maxUses: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'max_uses'
  },
  inviteds: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: []
  },
  expiresAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("NOW() + INTERVAL '4 DAYS'"),
    field: 'expires_at'
  }
})