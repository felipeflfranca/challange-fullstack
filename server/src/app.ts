import 'reflect-metadata'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

import morganMiddleware from './config/logger/morganMiddleware'
import { databaseConnect } from './database/typeorm'
import routers from './routes'

/**
 * Application create
 */
export const app = express()

/**
 * Enable service access
 */
app.use(cors())

/**
 * Defines sending and receiving JSON
 */
app.use(bodyParser.json())

/**
 * Morgan to use our custom logger
 */
app.use(morganMiddleware)

/**
 * Database config
 */
databaseConnect().then(connection => {
  if (connection.isConnected) {
    // router
    app.use('/api', routers)
  }
})
