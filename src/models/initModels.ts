import { UsersModel } from "./users";
import { FriendsRequestsModel } from "./friendsRequests";
import { ChatsModel } from "./chats";
import { ChatNotificationsModel } from "./chatNotifications";
import { PermissionsModel } from "./permissions";
import { MembersModel } from "./members";
import { MessagesModel } from "./messages";
import { PinnedMessagesModel } from "./pinnedMessages";
import { ReactionsModel } from "./reactions";
import { SessionsModel } from "./sessions";
import { UsesModel } from "./uses";
import { InvitationsModel } from "./invitations";
import { UserStatusModel } from "./userStatus";

export function initializeModels() {

  UsersModel.belongsToMany(ChatsModel, {through: MembersModel})
  ChatsModel.belongsToMany(UsersModel, {through: MembersModel})

  UsersModel.hasMany(FriendsRequestsModel, {
    foreignKey: 'senderId',
    as: 'sentRequests'
  });
  
  UsersModel.hasMany(FriendsRequestsModel, {
    foreignKey: 'receiverId',
    as: 'receivedRequests'
  });
  FriendsRequestsModel.belongsTo(UsersModel, {
    foreignKey: 'senderId',
    as: 'sentRequests'
  });
  
  FriendsRequestsModel.belongsTo(UsersModel, {
    foreignKey: 'receiverId',
    as: 'receivedRequests'
  });
  
  UserStatusModel.belongsTo(UsersModel)
  UsersModel.hasOne(UserStatusModel, {as: 'status', foreignKey: 'userId'})

  UsersModel.hasMany(MessagesModel)
  MessagesModel.belongsTo(UsersModel)
  MessagesModel.belongsTo(ChatsModel)
  ChatsModel.hasMany(MessagesModel)
  MessagesModel.hasMany(ReactionsModel)

  ReactionsModel.belongsTo(MessagesModel)
  ReactionsModel.belongsTo(UsersModel)
  UsersModel.hasMany(ReactionsModel)

  PinnedMessagesModel.belongsTo(MessagesModel)
  PinnedMessagesModel.belongsTo(ChatsModel)
  PinnedMessagesModel.belongsTo(UsersModel)
  ChatsModel.hasMany(PinnedMessagesModel)
  UsersModel.hasMany(PinnedMessagesModel)

  PermissionsModel.belongsTo(UsersModel)
  PermissionsModel.belongsTo(ChatsModel)
  UsersModel.hasMany(PermissionsModel)
  ChatsModel.hasMany(PermissionsModel)

  ChatNotificationsModel.belongsTo(UsersModel, {foreignKey: 'userId', as: 'notifications'})
  ChatNotificationsModel.belongsTo(ChatsModel)
  UsersModel.hasMany(ChatNotificationsModel, {foreignKey: 'id', as: 'notifications'})
  ChatsModel.hasMany(ChatNotificationsModel)

  InvitationsModel.belongsTo(UsersModel)
  InvitationsModel.belongsTo(ChatsModel)
  UsersModel.hasMany(InvitationsModel)
  ChatNotificationsModel.hasMany(InvitationsModel)

  SessionsModel.belongsTo(UsersModel)
  UsersModel.hasMany(SessionsModel)

  UsesModel.belongsTo(UsersModel)
  UsersModel.hasMany(UsesModel)
} 