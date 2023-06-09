import { sequelize } from './utils/database'
import { port } from './config'
import { initializeModels } from './models/initModels'
import { server } from './socket'

;(async () => {
  try {
    await sequelize.sync({force: false});
    console.log('✅ Connection to the database has been established successfully.');
    initializeModels()

    server.listen(port, () => {
      console.log(`🟢 Server started at port ${port}`);
    });

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
})()
