import { MembersModel } from "../models/members";


const createMember = (chatId: string, userId: string) => MembersModel.create({chatId, userId})


export default {
  createMember
}