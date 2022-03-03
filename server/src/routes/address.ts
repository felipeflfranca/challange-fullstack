import 'dotenv/config'
import { Router } from 'express'
import AddressController from '../controllers/AddressController'

export const addressRouter = Router()

const addressController = new AddressController()

addressRouter.post('/search', addressController.search)
