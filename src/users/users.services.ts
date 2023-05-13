import { Request, Response } from "express"
import usersControllers from "./users.controllers"
import { setErrorResposne } from "../utils/functions"
import validators from "../utils/validators"
import { hashPassword } from "../utils/functions"

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, userName } = req.body

    if(validators.missingData(res, [name, email, password, userName], {
      name: 'string',
      email: 'string & unique',
      password: 'string',
      userName: 'string & unique',
    })) return 

    const user = await usersControllers.createUser({name, email, password: hashPassword(password), userName})
    
    res.status(201).json({
      message: 'New registered user',
      user
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, about, friends, avatarUrl, userName, phoneNumber, blockedUsers, archivedChats } = req.body
    
    if([name, about, friends, avatarUrl, userName, phoneNumber, blockedUsers, archivedChats].every(e=> !e)) return setErrorResposne(res, 'Bad Request', 400, {
      name: 'string?',
      about: 'string?',
      friends: 'string[]?',
      avatarUrl: 'string?',
      userName: 'string?',
      phoneNumber: 'string?',
      blockedUsers: 'string[]?',
      archivedChats: 'string[]?'
    })

    await usersControllers.updateUser(id, {name, about, friends, avatarUrl, userName, phoneNumber, blockedUsers, archivedChats})
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

export default {
  createUser,
  getMyUser,
  getUser,
  updateUser,
  deleteUser
}