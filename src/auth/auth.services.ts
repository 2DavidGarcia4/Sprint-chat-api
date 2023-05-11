import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config'
import { loginUser } from './auth.controllers'
import { setErrorResposne } from '../utils/functions'
import { Request, Response } from 'express'
import validators from '../utils/validators'

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if(validators.missingData(res, [email, password], {
      email: 'string unique',
      password: 'string'
    })) return 
    
    const response = await loginUser(email, password)

    if(response){
      const token = jwt.sign({
        exp:  Math.floor(Date.now() / 1000) + (7*24*60*60),
        id: response.id,
        email: response.email,
      }, jwtSecret)
      
      res.status(200).json({
        message: 'correct credentials, user logged',
        token
      })
    
    } else setErrorResposne(res, 'Invalid credentials', 401)


  } catch (error: any) {
    setErrorResposne(res, error.message)
  }
} 