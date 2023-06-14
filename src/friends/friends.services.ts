import { Request, Response } from "express"
import usersControllers from "../users/users.controllers"
import { setErrorResposne } from "../utils/functions"
import friendsControllers from "./friends.controllers"
import validators from "../utils/validators"

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

const addFriend = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any
    const { userId } = req.params

    const newFriend = await usersControllers.getUserById(userId)
    if(!newFriend) return setErrorResposne(res, 'User not found', 404)

    await usersControllers.updateUser(userId, {friends: [...newFriend.friends, id]})
    
    const user = await usersControllers.getUserById(id)
    if(!user) return setErrorResposne(res, 'User not found', 404)
    user.friends.push(userId)

    await usersControllers.updateUser(id, {friends: user.friends})
    res.status(200).json(user)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const removeFriend = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any
    const { userId } = req.params

    const oldFriend = await usersControllers.getUserById(userId)
    if(!oldFriend) return setErrorResposne(res, 'User not found', 404)
    oldFriend.friends.splice(oldFriend.friends.indexOf(id), 1)

    await usersControllers.updateUser(userId, {friends: oldFriend.friends})
    
    const user = await usersControllers.getUserById(id)
    if(!user) return setErrorResposne(res, 'User not found', 404)
    user.friends.splice(user.friends.indexOf(userId), 1)

    await usersControllers.updateUser(id, {friends: user.friends})
    res.status(200).json(user)
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


const getFriendsRequests = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const requests = await friendsControllers.getFriendsRequests(id)
    res.status(200).json(requests)
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
} 

const createFriendsRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any
    const { receiverId, message } = req.body

    if(receiverId == undefined || (message && typeof message != 'string')) return setErrorResposne(res, 'Missing data', 400, {
      receiverId: 'string',
      message: 'string?'
    })

    const newRequest = await friendsControllers.createFriendsRequest({senderId: id, receiverId, message})
    res.status(201).json(newRequest)
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
} 

const deleteFriendsRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await friendsControllers.deleteFriendsRequest(id)
    res.status(204)
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
} 


export default {
  getFriends,
  addFriend,
  removeFriend,
  getFriendsRequests,
  createFriendsRequest,
  deleteFriendsRequest
}