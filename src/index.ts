import express from 'express'
import cors from 'cors'
import { sequelize } from './utils/database'

import { port } from './config'
import { initializeModels } from './models/initModels'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/ping', (_, res)=> {
  res.json({message: 'Pong'})
})

;(async () => {
  try {
    await sequelize.sync({force: false});
    console.log('Connection has been established successfully.');
    initializeModels()

    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()
