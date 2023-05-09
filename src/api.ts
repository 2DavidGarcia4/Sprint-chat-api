import express from 'express'
import cors from 'cors'

const prefix = '/api/v1/'
const app = express()

app.use(express.json())
app.use(cors())

app.get(`${prefix}ping`, (_, res)=> {
  res.json({message: '🏓 Pong'})
})

export default app