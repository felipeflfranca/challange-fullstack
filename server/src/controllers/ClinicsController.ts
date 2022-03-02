import { Request, Response } from 'express'
import Logger from '../config/logger'
import ClinicRepository from '../services/repositories/ClinicRepository'
import ClinicInterface from '../services/interfaces/ClinicInterface'
import Clinic from '../database/typeorm/entities/Clinic'
import Address from '../entities/Adress'
import ValidatorUtils from '../utils/ValidatorUtils'

export default class ClinicsController {
  private repository: ClinicInterface

  constructor () {
    this.repository = new ClinicRepository()
  }

  /** Save clinic data */
  save = async (req: Request, res: Response) => {
    const { id, name, cnpj, address } = req.body

    const clinic = new Clinic()

    if (id) {
      clinic.id = id
    }

    try {
      clinic.name = name
      clinic.cnpj = cnpj
      clinic.address = new Address(address)

      new ValidatorUtils({
        data: clinic,
        validate: [
          { field: 'name', message: 'O campo Nome é obrigatório' },
          { field: 'cnpj', message: 'O campo CNPJ é obrigatório' },
          { field: 'place', message: 'O campo Logradouro é obrigatório' },
          { field: 'number', message: 'O campo Número é obrigatório' },
          { field: 'district', message: 'O campo Bairro é obrigatório' },
          { field: 'postalCode', message: 'O campo CEP é obrigatório' },
          { field: 'city', message: 'O campo Cidade é obrigatório' },
          { field: 'state', message: 'O campo Estado é obrigatório' },
          { field: 'country', message: 'O campo País é obrigatório' },
          { field: 'lat', message: 'O campo Latitude é obrigatório' },
          { field: 'lng', message: 'O campo Longitude é obrigatório' }
        ]
      }).check()

      const data = await this.repository.save(clinic)

      res.json(data)
    } catch (error) {
      Logger.error(error.message)
      res.status(404).json({ message: error.message })
    }
  }

  /** Get clinic by id */
  get = async (req: Request, res: Response) => {
    const { id } = req.body

    const clinic = await this.repository.getById(id)
    res.json(clinic)
  }

  /** Get clinic by id */
  getByAddress = async (req: Request, res: Response) => {
    const { id } = req.body

    const clinic = await this.repository.getById(id)
    res.json(clinic)
  }

  /** Get all clinics */
  all = async (req: Request, res: Response) => {
    const all = await this.repository.getAll()
    res.json(all)
  }
}
