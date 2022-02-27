import { app } from './app'
import Logger from './config/logger'

const PORT = process.env.LISTENING_PORT || 3001

const server = app.listen(PORT, () => Logger.info(`SERVICE: The service has started and is listening on port ${PORT}`))

process.on('SIGINT', () => {
  server.close()
  Logger.info('SERVICE: The service has been stopped')
})
