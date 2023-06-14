import { Op } from "sequelize";
import { FriendsRequestsModel } from "../models/friendsRequests";
import { UsersModel } from "../models/users";


const getFriendsRequests = (id: string) => FriendsRequestsModel.findAll({
  where: {  
    [Op.or]: [
      { senderId: id },
      { receiverId: id }
    ]
  },
  attributes: {
    exclude: ['receiverId', 'senderId']
  },
  include: [
    {
      model: UsersModel,
      as: 'receiver',
      attributes: {
        exclude: ['about', 'email', 'password', 'archivedChats', 'blockedUsers', 'color', 'phoneNumber', 'createdAt', 'updatedAt']
      }
    },
    {
      model: UsersModel,
      as: 'sender',
      attributes: {
        exclude: ['about', 'email', 'password', 'archivedChats', 'blockedUsers', 'color', 'phoneNumber', 'createdAt', 'updatedAt']
      }
    },
  ]
})

const createFriendsRequest = (data: {
  senderId: string
  receiverId: string
  message?: string
}) => FriendsRequestsModel.create(data)

const deleteFriendsRequest = (id: string) => FriendsRequestsModel.destroy({
  where: {
    id
  }
})


export default {
  getFriendsRequests,
  createFriendsRequest,
  deleteFriendsRequest
}