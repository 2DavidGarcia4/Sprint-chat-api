import express from 'express'
import messagesServices from './messages.services'
import authMiddleware from '../middlewares/auth.middleware'
import passport from 'passport'

const router = express()

authMiddleware(passport)

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  messagesServices.updateMessage
)

export default router