import { Router } from 'express'
import { clinicsRouter } from './clinics'

const routers = Router()

/**
 * Routes
 */
routers.use('/clinics', clinicsRouter)
routers.use('/', (req, res) => res.send('Route not found /'))

export default routers
