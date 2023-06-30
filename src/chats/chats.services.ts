import { Request, Response } from "express";
import chatsControllers from "./chats.controllers";
import { setErrorResposne } from "../utils/functions";
import membersControllers from "../members/members.controllers";
import notificationsControllers from "../notifications/notifications.controllers";
import messagesControllers from "../messages/messages.controllers";
import usersControllers from "../users/users.controllers";

const getAllChats = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const chats = await chatsControllers.getAllChats(id)
    res.status(200).json(chats?.chats)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const getChatById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const chat = await chatsControllers.getChatById(id)
    res.status(200).json(chat)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const getChatByFriend = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any
    const { userId } = req.params

    const chat = await chatsControllers.getChatByFriend(id, userId)
    console.log(chat)
    if(!chat) return setErrorResposne(res, 'Chat not found', 404)

    res.status(200).json(chat)
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const getChatMembers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const chat = await chatsControllers.getChatMembers(id)
    res.status(200).json(chat?.users)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const createChat = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any
    const { name, type, description, iconUrl } = req.body

    if(type == undefined) return setErrorResposne(res, 'Missing data', 400, {
      type: 'number <0 | 1>',
      name: 'string?',
      iconUrl: 'string?'
    })

    const newChat = await chatsControllers.createChat({ownerId: id, name, type, description, iconUrl})
    await membersControllers.createMember(newChat.id, id)
    res.status(201).json(newChat)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


//* Notifications
const getChatNotifications = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user as any
    const { id: chatId } = req.params
    
    const notifications = await notificationsControllers.getNotificationByChat(userId, chatId)
    res.status(200).json(notifications)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const handlerChatNotification = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user as any
    const { id: chatId } = req.params
    const { amount } = req.body

    if(amount && typeof amount != 'number') return setErrorResposne(res, 'Incorrect value type for amount', 422, {
      amount: 'number?'
    }) 

    const notification = await notificationsControllers.getNotificationByChat(userId, chatId)
    if(notification){
      if(notification.disabled) return res.status(200).json({
        message: 'Notifications disabled',
        notification
      })

      await notificationsControllers.updateNotification(userId, chatId, {amount: notification.amount+1})
      const updatedNotification = await notificationsControllers.getNotificationById(notification.id)
      res.status(200).json(updatedNotification)

    }else{
      const newNotification = await notificationsControllers.createNotification({chatId, userId, amount: amount || 1})
      res.status(201).json(newNotification)
    }

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const updateChatNotification = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user as any
    const { id: chatId } = req.params
    const { amount, disabled } = req.body

    if(typeof amount == 'undefined' && typeof disabled == 'undefined') return setErrorResposne(res, 'Missing data', 400, {
      amount: 'number?',
      disabled: 'boolean?'
    })

    await notificationsControllers.updateNotification(userId, chatId, {amount, disabled})
    const updatedNotification = await notificationsControllers.getNotificationByChat(userId, chatId)
    res.status(200).json(updatedNotification)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


//* Messages
const getAllMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const messages = await messagesControllers.getAllMessages(id)
    res.status(200).json(messages)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const createMessage = async (req: Request, res: Response) => {
  try {
    const { id: authorId } = req.user as any
    const { id: chatId } = req.params
    const { content, referenceId } = req.body

    if(!content) return setErrorResposne(res, 'Missing data', 400, {
      content: 'string'
    })

    const newMessage = await messagesControllers.createMessage({authorId, chatId, content, referenceId})
    res.status(201).json(newMessage)
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


const getArchivedChats = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const user = await usersControllers.getUserById(id)
    if(!user) return setErrorResposne(res, 'User not found')

    const archivedChats = await chatsControllers.getArchivedChats(user.archivedChats)
    res.status(200).json(archivedChats)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


export default {
  getAllChats,
  getChatById,
  getChatMembers,
  getChatByFriend,
  createChat,

  getChatNotifications,
  handlerChatNotification,
  updateChatNotification,

  getAllMessages,
  createMessage,

  getArchivedChats
}