import { PermissionsModel } from "../models/permissions";
import { ChatsModel } from "../models/chats";
import { UsersModel } from "../models/users";
import { ChatNotificationsModel } from "../models/chatNotifications";

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

const getChatById = (id: string) => {
  console.log(UsersModel.associations)
  console.log(ChatNotificationsModel.associations)
  return ChatsModel.findByPk(id, {
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
}

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
  name: string
  type?: number
  ownerId: string
}) => ChatsModel.create(data)


export default {
  getAllChats,
  getChatById,
  getChatMembers,
  createChat
}