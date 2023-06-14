import express from 'express'
import cors from 'cors'

import authRoutes from './auth/auth.routes'
import usersRoutes from './users/users.routes'
import statusRoutes from './status/status.routes'
import chatsRoutes from './chats/chats.routes'
import friendsRoutes from './friends/friends.routes'
import messagesRoutes from './messages/messages.routes'
import notificationsRoutes from './notifications/notifications.routes'

const prefix = '/api/v1/'
const app = express()

app.use(express.json())
app.use(cors())
app.use(`${prefix}auth`, authRoutes)
app.use(`${prefix}users`, usersRoutes)
app.use(`${prefix}status`, statusRoutes)
app.use(`${prefix}chats`, chatsRoutes)
app.use(`${prefix}friends`, friendsRoutes)
app.use(`${prefix}messages`, messagesRoutes)
app.use(`${prefix}notifications`, notificationsRoutes)

app.get(`${prefix}ping`, (_, res)=> {
  res.json({message: '🏓 Pong'})
})

export default app