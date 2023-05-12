import { SessionsModel } from "../models/sessions";
import { UsersModel } from "../models/users";
import { UsesModel } from "../models/uses";

const getAllUses = () => UsesModel.findAll({
  order: [['createdAt', 'DESC']],
  include: [
    {
      model: UsersModel,
      attributes: ['id', 'name', 'userName', 'avatarUrl']
    }
  ],
  attributes: {
    exclude: ['userId']
  }
})

const getUseById = (id: string) => UsesModel.findByPk(id)

const getUserUses = (userId: string) => UsesModel.findAll({
  where: {
    userId
  },
  order: [['createdAt', 'DESC']],
  attributes: {
    exclude: ['userId']
  }
})

const addUse = (userId: string) => UsesModel.create({userId, amount: 1})

const updateUse = (id: string, amount: number) => UsesModel.update({amount}, {
  where: {
    id
  }
})


const getAllSessions = () => SessionsModel.findAll({
  order: [['createdAt', 'DESC']],
  include: [
    {
      model: UsersModel,
      attributes: ['id', 'name', 'userName', 'avatarUrl']
    }
  ],
  attributes: {
    exclude: ['userId']
  }
})

const getSessionById = (id: string) => SessionsModel.findByPk(id)

const getUserSessions = (userId: string) => SessionsModel.findAll({
  where: {
    userId
  },
  order: [['createdAt', 'DESC']],
  attributes: {
    exclude: ['userId']
  }
})

const addSession = (userId: string) => SessionsModel.create({userId})

const updateSession = (id: string) => SessionsModel.update({endAt: new Date()}, {
  where: {
    id
  }  
})


export default {
  getAllUses,
  getUseById,
  getUserUses,
  addUse,
  updateUse,

  getAllSessions,
  getSessionById,
  getUserSessions,
  addSession,
  updateSession
}