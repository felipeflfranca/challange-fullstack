import Clinic from '../../entities/Clinic'

export default interface ClinicInterface {
  save: (clinic: Clinic) => Promise<Clinic>;
  getById: (id: number) => Promise<Clinic>;
  getAll: () => Promise<Clinic[]>;
  getByAddress: (address: string) => Promise<Clinic[]>;
}
