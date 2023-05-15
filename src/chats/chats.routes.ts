import express from 'express'
import chatsServices from './chats.services'
import authMiddleware from '../middlewares/auth.middleware'
import passport from 'passport'

const router = express()

authMiddleware(passport)

router.route('/')
.get(
  passport.authenticate('jwt', { session: false }),
  chatsServices.getAllChats
)
.post(
  passport.authenticate('jwt', { session: false }),
  chatsServices.createChat
)


router.route('/:id')
.get(
  passport.authenticate('jwt', { session: false }),
  chatsServices.getChatById
)

router.get('/:id/members',
  passport.authenticate('jwt', { session: false }),
  chatsServices.getChatMembers
)

router.route('/:id/notifications')
.get(
  passport.authenticate('jwt', { session: false }),
  chatsServices.getChatNotifications
)
.patch(
  passport.authenticate('jwt', { session: false }),
  chatsServices.updateChatNotification
)


router.route('/:id/messages')
.get(
  passport.authenticate('jwt', { session: false }),
  chatsServices.getAllMessages
)
.post(
  passport.authenticate('jwt', { session: false }),
  chatsServices.createMessage
)


router.post('/:id/notifications/increase',
  passport.authenticate('jwt', { session: false }),
  chatsServices.handlerChatNotification
)


export default router