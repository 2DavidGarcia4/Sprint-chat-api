import { Sequelize } from "sequelize"
import { DeletedMessagesModel } from "../models/deletedMessages"
import { MessagesModel } from "../models/messages"
import { MessagesReadsModel } from "../models/messagesReads"
import { UsersModel } from "../models/users"


const getAllMessages = (chatId: string) => MessagesModel.findAll({
  where: {
    chatId
  },
  include: [
    {
      model: DeletedMessagesModel,
      as: 'deleted'
    },
    {
      model: MessagesReadsModel
    }
  ]
}) 

const createMessage = (data: {
  chatId: string
  authorId: string
  content: string
  referenceId?: string 
}) => MessagesModel.create(data)

const updateMessage = (id: string, content: string) => MessagesModel.update({edited: true, content}, {
  where: {
    id
  }
})



export default {
  getAllMessages,
  createMessage,
  updateMessage
}