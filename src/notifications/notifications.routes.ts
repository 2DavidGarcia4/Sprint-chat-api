import express from 'express'
import notificationsServices from './notifications.services'
import passport from 'passport'
import authMiddleware from '../middlewares/auth.middleware'

const router = express()

authMiddleware(passport)

router.get('/',
  passport.authenticate('jwt', { session: false }),
  notificationsServices.getAllNotifications
)

export default router