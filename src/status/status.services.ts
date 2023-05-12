import { Request, Response } from "express";
import { setErrorResposne } from "../utils/functions";
import statusControllers from "./status.controllers";

const getAllUses = async (req: Request, res: Response) => {
  try {
    const allUses = await statusControllers.getAllUses()
    res.status(200).json(allUses)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const getUserUses = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const uses = await statusControllers.getUserUses(id)
    res.status(200).json(uses)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const handleUse = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any
    const { amount } = req.body

    if(amount && typeof amount != 'number') return setErrorResposne(res, 'Incorrect value type for amount', 422, {
      amount: 'number?'
    }) 

    const uses = await statusControllers.getUserUses(id)
    const firstUse = uses[0]
    if(firstUse){
      console.log(firstUse.createdAt.getTime())
      if(firstUse.createdAt.getTime() > Date.now()-(24*60*60000)){
        console.log('aaa')
        await statusControllers.updateUse(firstUse.id, amount ? firstUse.amount+amount : firstUse.amount+1) 
        const use = await statusControllers.getUseById(firstUse.id)
        res.status(200).json(use)
      
      }else{
        console.log('hoo')
        const newUse = await statusControllers.addUse(id)
        res.status(201).json(newUse)
      }

    }else{
      const use = await statusControllers.addUse(id)
      res.status(201).json(use)
    }

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


const getAllSessions = async (req: Request, res: Response) => {
  try {
    const allSessions = await statusControllers.getAllSessions()
    res.status(200).json(allSessions)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const getUserSessions = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const uses = await statusControllers.getUserSessions(id)
    res.status(200).json(uses)

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const addNewSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const sessions = await statusControllers.getUserSessions(id)
    const lastSession = sessions[0]
    
    if(lastSession && !lastSession.endAt) return setErrorResposne(res, 'The session has not closed yet', 409)

    const session = await statusControllers.addSession(id)
    res.status(201).json({
      message: 'Logged session',
      session
    })
    
  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}

const closeSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as any

    const sessions = await statusControllers.getUserSessions(id), lastSession = sessions[0]
    if(!lastSession) return setErrorResposne(res, 'No sessions started', 404)

    if(lastSession.endAt) return setErrorResposne(res, 'The session has already been closed', 409)

    await statusControllers.updateSession(lastSession.id)
    const session = await statusControllers.getSessionById(lastSession.id)
    res.status(200).json({
      message: 'Session closed',
      session
    })

  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
}


export default {
  getAllUses,
  getUserUses,
  handleUse,

  getAllSessions,
  getUserSessions,
  addNewSession,
  closeSession
}