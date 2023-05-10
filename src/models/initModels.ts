import { UsersModel } from "./users";
import { FriendsRequestsModel } from "./friendsRequests";
import { ChatsModel } from "./chats";
import { ChatNotificationsModel } from "./chatNotifications";
import { ChatPermissionsModel } from "./chatPermissions";
import { MembersModel } from "./members";
import { MessagesModel } from "./messages";
import { PinnedMessagesModel } from "./pinnedMessages";
import { ReactionsModel } from "./reactions";
import { SessionsModel } from "./sessions";
import { UsesModel } from "./uses";
import { InvitationsModel } from "./invitations";

export function initializeModels() {

  UsersModel.belongsToMany(ChatsModel, {through: MembersModel})
  ChatsModel.belongsToMany(UsersModel, {through: MembersModel})

  UsersModel.hasMany(FriendsRequestsModel)
  FriendsRequestsModel.belongsTo(UsersModel)
  
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

  ChatPermissionsModel.belongsTo(MembersModel)
  ChatPermissionsModel.belongsTo(ChatsModel)
  MembersModel.hasMany(ChatPermissionsModel)
  ChatsModel.hasMany(ChatPermissionsModel)

  ChatNotificationsModel.belongsTo(UsersModel)
  ChatNotificationsModel.belongsTo(ChatsModel)
  UsersModel.hasMany(ChatNotificationsModel)
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