import { getRepository } from 'typeorm'
import TypeormClinic from '../../database/typeorm/entities/Clinic'
import Clinic from '../../entities/Clinic'
import ClinicInterface from '../interfaces/ClinicInterface'

export default class ClinicRepository implements ClinicInterface {
  save = async (clinic: Clinic) =>
    await getRepository(TypeormClinic).save(clinic)

  getById = async (id: number) =>
    await getRepository(TypeormClinic).findOne({ id })

  getByAddress = async (address: string) =>
    await getRepository(TypeormClinic).find()

  getAll = async () => await getRepository(TypeormClinic).find()
}
