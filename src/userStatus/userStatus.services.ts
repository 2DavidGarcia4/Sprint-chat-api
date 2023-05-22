import { Request, Response } from "express";
import { setErrorResposne } from "../utils/functions";
import userStatusControllers from "./userStatus.controllers";
import usersControllers from "../users/users.controllers";

const getUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const user = await usersControllers.getUserById(id)
    const status = await userStatusControllers.getUserStatus(user?.status?.id as string)
    res.status(200).json(status)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any
    const { type, emoji, message, } = req.body

    if([type, emoji, message].every(e=> e == undefined)) return setErrorResposne(res, 'Bad Request', 400, {
      type: 'number?',
      emoji: 'string?',
      message: 'string?'
    })

    const user = await usersControllers.getUserById(id)
    await userStatusControllers.updateUserStatus(user?.status.id as string, {type, emoji, message})
    const updatedUserStatus = await usersControllers.getUserById(id)
    res.status(200).json(updatedUserStatus)
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


export default {
  getUserStatus,
  updateUserStatus
}