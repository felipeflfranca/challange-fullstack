import { Router } from 'express'
import { clinicsRouter } from './clinics'
import { addressRouter } from './address'

const routers = Router()

/**
 * Routes
 */
routers.use('/clinics', clinicsRouter)
routers.use('/address', addressRouter)
routers.use('/', (req, res) => res.send('Route not found /'))

export default routers
