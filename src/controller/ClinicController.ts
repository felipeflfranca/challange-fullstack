import { getManager } from 'typeorm'
import { Clinics } from '../entity/Clinics'

export class ClinicController {
  async getById (id: number) {
    const clinic = await getManager().findOne(Clinics, id)
    return clinic
  }

  async all () {
    const all = await getManager().find(Clinics)
    return all
  }

  async save (clinic: Clinics) {
    const saved = await getManager().save(clinic)
    return saved
  }
}
