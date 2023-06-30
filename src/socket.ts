import { Server as SocketServer } from 'socket.io'
import app from './api'
import http from 'http'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData, User } from './types'
import userStatusControllers from './userStatus/userStatus.controllers'

export const server = http.createServer(app)
const io = new SocketServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: '*' // or http://localhost:5173/
  }
})


io.on('connection', (socket) => {
  console.log('🔌 Socket connection')
  let user: User | undefined

  socket.broadcast.emit("ready", 'Conectado')

  // socket.emit("callback", (e: any) => {
  //   console.log(e)
  // });
  
  socket.on('disconnect', ()=> {
    // console.log('🔒 Disconnect')
    if(user){
      if(user.status) {
        user.status.type = 0
        userStatusControllers.updateUserStatus(user.status.id, {type: 0})
      }
      socket.broadcast.emit('userUpdate', user)
    }
  })

  socket.on('userUpdate', (updatedUser) => {
    user = updatedUser
    socket.broadcast.emit('userUpdate', updatedUser)
  })

  socket.on('friendRequestCreate', (friendRequest)=> {
    socket.broadcast.emit('friendRequestCreate', friendRequest)
  })

  socket.on('friendRequestDelete', (friendRequest)=> {
    socket.broadcast.emit('friendRequestDelete', friendRequest)
  })
  
  socket.on('friendAdd', (friend)=> {
    socket.broadcast.emit('friendAdd', friend)
  })
  
  socket.on('friendRemove', (friend)=> {
    socket.broadcast.emit('friendRemove', friend)
  })
})