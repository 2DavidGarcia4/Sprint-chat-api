import { Request, Response } from "express";
import { setErrorResposne } from "../utils/functions";
import messagesControllers from "./messages.controllers";


const updateMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { content } = req.body
    
    if(!content) return setErrorResposne(res, 'Missing data', 400, {
      content: 'string'
    })

    await messagesControllers.updateMessage(id, content)
    res.status(200).json({
      message: 'Mensaje actualizado'
    })

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


export default {
  updateMessage
}