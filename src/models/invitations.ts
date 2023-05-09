import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export const InvitationsModel = sequelize.define('invitations', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  groupId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'group_id'
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'created_by'
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