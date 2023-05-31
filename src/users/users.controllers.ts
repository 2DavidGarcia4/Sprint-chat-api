import { ChatsModel } from "../models/chats"
import { UserStatusModel } from "../models/userStatus"
import { UsersModel } from "../models/users"

const getAllUsers = (emails?: boolean, names?: boolean) => UsersModel.findAll({
  attributes: {
    exclude: [(emails ? '' : 'email'), (names ? '' : ['name', 'userName']), 'about', 'friends', 'color', 'password', 'avatarUrl', 'phoneNumber', 'blockedUsers', 'archivedChats', 'createdAt', 'updatedAt'].flat()
  }
})

const getUserById = (id: string, include?: boolean) => UsersModel.findByPk(id, {
  attributes: {
    exclude: include ? [] : ['password']
  },
  include: [
    {
      model: UserStatusModel,
      as: 'status',
      attributes: {
        exclude: ['userId']
      }
    },
    {
      model: ChatsModel,
      through: { attributes: [] }
    }
  ]
})

const getUserByEmail = (email: string) =>UsersModel.findOne({
  where: {
    email
  }
})


const createUser = (data: {
  email: string,
  password: string,
  userName: string
}) => UsersModel.create(data)


const updateUser = (id: string, newData: object) => UsersModel.update(newData, {
  where: {
    id
  }
})

const deleteUser = (id: string) => {
  UserStatusModel.destroy({
    where: {
      userId: id
    }
  })

  return UsersModel.destroy({
    where: {
      id
    }
  })
}

const getFriends = (friends: string[]) => UsersModel.findAll({
  where: {
    id: friends
  }
})

const getBlockedUsers = (blockedUsers: string[]) => UsersModel.findAll({
  where: {
    id: blockedUsers
  }
})


export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getFriends,
  getBlockedUsers,
}