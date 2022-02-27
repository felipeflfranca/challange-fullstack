import { createConnection } from 'typeorm'
import Logger from './logger'

export const databaseConnect = async () => {
  const connection = await createConnection()
  Logger.info(`DATABASE: Connection to ${connection.options.database} database successfully established`)

  process.on('SIGINT', () => {
    connection.close().then(() => Logger.info('DATABASE: Database connection closed'))
  })
}
