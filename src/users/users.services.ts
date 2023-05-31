import { Request, Response } from "express"
import usersControllers from "./users.controllers"
import { setErrorResposne } from "../utils/functions"
import validators from "../utils/validators"
import { hashPassword } from "../utils/functions"
import { tokenGenerator } from "../auth/auth.services"
import userStatusControllers from "../userStatus/userStatus.controllers"
import { comparePassword } from "../utils/functions"

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { names, emails } = req.query as any

    if([names, emails].every(e=> e == undefined)) return setErrorResposne(res, 'At least one query parameter is required.', 400, {
      names: 'boolean?',
      emails: 'boolean?'
    })

    const users = await usersControllers.getAllUsers(emails, names)
    res.status(200).json(users)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const logedUser = (req: Request, res: Response) => {
  try {
    res.json(true)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body

    if(validators.missingData(res, [email, password, userName], {
      email: 'string & unique',
      password: 'string',
      userName: 'string & unique',
    })) return 

    const user = await usersControllers.createUser({email, password: hashPassword(password), userName})
    const status = await userStatusControllers.createUserStatus(user.id, 1)
    const token = tokenGenerator(user.id, user.email)

    res.status(201).json({
      message: 'New registered user',
      user: {...user.dataValues, status},
      token
    })

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
} 

const getMyUser = async (req: Request, res: Response) => {
  try {
    if(!req.user) return setErrorResposne(res, 'Unauthorized', 401)

    const { id } = req.user as any

    const myUser = await usersControllers.getUserById(id)    
    res.status(200).json(myUser)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
} 

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    console.log({id})
    const user = await usersControllers.getUserById(id)
    res.status(200).json(user)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const verifyPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any
    const { password } = req.body

    if(!password) return setErrorResposne(res, 'Bad Request', 400, {
      password: 'string',
    })

    const user = await usersControllers.getUserById(id, true)
    const value = comparePassword(password, user?.password as string)
    res.status(200).json(value)
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, about, color, friends, password, avatarUrl, userName, phoneNumber, blockedUsers, archivedChats } = req.body
    
    if([name, about, color, friends, password, avatarUrl, userName, phoneNumber, blockedUsers, archivedChats].every(e=> e == undefined)) return setErrorResposne(res, 'Bad Request', 400, {
      name: 'string?',
      about: 'string?',
      color: 'string?',
      friends: 'string[]?',
      password: 'string?',
      avatarUrl: 'string?',
      userName: 'string?',
      phoneNumber: 'string?',
      blockedUsers: 'string[]?',
      archivedChats: 'string[]?'
    })

    await usersControllers.updateUser(id, {name, about, color, friends, password: password ? hashPassword(password) : undefined, avatarUrl, userName, phoneNumber, blockedUsers, archivedChats})
    const updatedUser = await usersControllers.getUserById(id)
    res.status(200).json(updatedUser)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const data = await usersControllers.deleteUser(id)
    res.status(204).json(data)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const getFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const user = await usersControllers.getUserById(id)
    if(!user) return setErrorResposne(res, 'User not found', 404)

    const friends = await usersControllers.getFriends(user.friends)
    res.status(200).json(friends)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const getBlockedUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const user = await usersControllers.getUserById(id)
    if(!user) return setErrorResposne(res, 'User not found', 404)

    const friends = await usersControllers.getBlockedUsers(user.blockedUsers)
    res.status(200).json(friends)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


export default {
  getAllUsers,
  createUser,
  getMyUser,
  getUser,
  verifyPassword,
  updateUser,
  deleteUser,
  logedUser,
  getFriends,
  getBlockedUsers
}