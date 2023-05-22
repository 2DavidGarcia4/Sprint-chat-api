import { UserStatusModel } from '../models/userStatus'

const getUserStatus = (id: string) => UserStatusModel.findByPk(id)

const createUserStatus = (userId: string, type: number) => UserStatusModel.create({
  userId,
  type
})

const updateUserStatus = (id: string, data: {
  type?: number,
  emoji?: string
  message?: string
}) => UserStatusModel.update(data, {
  where: {
    id
  }
})

const deleteUserStatus = (id: string) => UserStatusModel.destroy({
  where: {
    id
  }
})


export default {
  getUserStatus,
  createUserStatus,
  updateUserStatus,
  deleteUserStatus
}