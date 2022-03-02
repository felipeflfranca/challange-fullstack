import { Router } from 'express'
import ClinicsController from '../controllers/ClinicsController'

export const clinicsRouter = Router()

const clinicController = new ClinicsController()

clinicsRouter.post('/', clinicController.save)
clinicsRouter.get('/', clinicController.all)
