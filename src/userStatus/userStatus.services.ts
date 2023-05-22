import { Request, Response } from "express";
import { setErrorResposne } from "../utils/functions";
import userStatusControllers from "./userStatus.controllers";

const getUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const status = userStatusControllers.getUserStatus(id)
    res.status(200).json(status)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status, emoji, message, } = req.body

    if([status, emoji, message].every(e=> !e)) return setErrorResposne(res, 'Bad Request', 400, {
      status: 'number?',
      emoji: 'string?',
      message: 'string?'
    })

    await userStatusControllers.updateUserStatus(id, {status, emoji, message})
    const updatedUser = await userStatusControllers.getUserStatus(id)
    res.status(200).json(updatedUser)
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


export default {
  getUserStatus,
  updateUserStatus
}