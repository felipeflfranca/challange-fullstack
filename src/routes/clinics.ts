import { Router } from 'express'
import { ClinicController } from '../controller/ClinicController'
import { Clinics } from '../entity/Clinics'

export const clinics = Router()
const clinicController = new ClinicController()

clinics.post('/', async (req, res) => {
  const { name, cpf, address } = req.body
  const clinic = new Clinics(name, cpf, address)
  const savedClinic = await clinicController.save(clinic)
  res.json(savedClinic)
})

clinics.get('/', async (req, res) => {
  const all = await clinicController.all()
  res.json(all)
})
