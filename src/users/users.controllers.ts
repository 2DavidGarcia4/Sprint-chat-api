import { UserStatusModel } from "../models/userStatus"
import { UsersModel } from "../models/users"

const getAllUsers = (emails?: boolean, names?: boolean, preview?: boolean) => UsersModel.findAll({
  attributes: {
    exclude: [
      (preview ? '' :  
        [ 
          'avatarUrl',
          (emails ? '' : 'email'), 
          (names ? '' : ['name', 'userName'])
        ]
      ),
      'about', 'friends', 'color', 'password', 'phoneNumber', 'blockedUsers', 'archivedChats', 'createdAt', 'updatedAt'
    ].flat(2)
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


const updateUser = (id: string, newData: {
  name?: string
  email?: string
  about?: string
  friends?: string[]
  color?: string
  password?: string
  avatarUrl?: string 
  userName?: string
  phoneNumber?: string
  blockedUsers?: string[]
  archivedChats?: string[]
}) => UsersModel.update(newData, {
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
    id: friends,
  },
  include: [
    {
      model: UserStatusModel,
      as: 'status',
      attributes: {
        exclude: ['userId']
      }
    }
  ]
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