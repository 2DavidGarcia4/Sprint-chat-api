import { PermissionsModel } from "../models/permissions";
import { ChatsModel } from "../models/chats";
import { UsersModel } from "../models/users";
import { ChatNotificationsModel } from "../models/chatNotifications";
import { Op } from "sequelize";
import { MembersModel } from "../models/members";

const getAllChats = (userId: string) => UsersModel.findByPk(userId, {
  attributes: {
    exclude: ['id', 'name', 'email', 'about', 'friends', 'password', 'phoneNumber', 'blockedUsers', 'createAt', 'updateAt']
  },
  include: [
    {
      model: ChatsModel,
      through: { attributes: [] }
    }
  ]
})

const getChatById = (id: string) => ChatsModel.findByPk(id, {
  include: [
    {
      model: ChatNotificationsModel,
    },
    {
      model: UsersModel,
      include: [
        {
          model: ChatNotificationsModel,
          as: 'notifications'
        }
      ]
    }
  ]
})

const getChatByFriend = (firstUserId: string, lastUserId: string) => ChatsModel.findOne({
  where: {
    type: 0,
  },
  include: [
    {
      model: UsersModel,
      where: {
        id: [firstUserId, lastUserId]
      },
      through: { attributes: [] },
    }
  ]
})


const getChatMembers = (id: string) => ChatsModel.findByPk(id, {
  include: [
    {
      model: UsersModel,
      attributes: {
        exclude: ['password', 'email', 'phoneNumber', 'blockedUsers', 'archivedChats', 'friends', 'createdAt', 'updatedAt']
      },
      through: { attributes: [] },
      include: [
        {
          model: PermissionsModel
        }
      ]
    }
  ]
})

const createChat = (data: {
  name?: string
  type?: number
  ownerId: string
  iconUrl?: string
  description?: string
}) => ChatsModel.create(data)

const getArchivedChats = (archivedChats: string[]) => ChatsModel.findAll({
  where: {
    id: archivedChats
  }
})


export default {
  getAllChats,
  getChatById,
  getChatByFriend,
  getChatMembers,
  createChat,
  getArchivedChats
}