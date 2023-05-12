import { Request, Response } from "express";
import { setErrorResposne } from "../utils/functions";
import notificationsControllers from "./notifications.controllers";


const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const notifications = await notificationsControllers.getAllNotifications(id)
    res.status(200).json(notifications)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

export default {
  getAllNotifications
}