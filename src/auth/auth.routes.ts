import express from 'express'
import { login } from './auth.services'
import usersServices from '../users/users.services'

const router = express()

router.post('/login', login)
router.post('/register', usersServices.createUser)

export default router