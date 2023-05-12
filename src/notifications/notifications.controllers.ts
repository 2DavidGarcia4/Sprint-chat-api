import { ChatNotificationsModel } from "../models/chatNotifications";

const getNotificationById = (id: string) => ChatNotificationsModel.findByPk(id)

const getAllNotifications = (userId: string) => ChatNotificationsModel.findAll({
  where: {
    userId
  }
})

const getNotificationByChat = (userId: string, chatId: string) => ChatNotificationsModel.findOne({
  where: {
    userId,
    chatId
  }
})

const createNotification = (data: {
  chatId: string
  userId: string
  amount: number
}) => ChatNotificationsModel.create(data)

const updateNotification = (userId: string, chatId: string, data: {
  amount?: number, 
  disabled?: boolean
}) => ChatNotificationsModel.update(data, {
  where: {
    userId,
    chatId
  }
})


export default {
  getNotificationById,
  getAllNotifications,
  getNotificationByChat,
  createNotification,
  updateNotification
}