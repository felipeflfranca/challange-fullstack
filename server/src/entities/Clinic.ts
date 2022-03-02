import Address from './Adress'

interface ClinicProps {
  id?: number;
  name: string;
  cpf: string;
  address: Address;
}

export default class Clinic {
  id?: number;
  name: string;
  cpf: string;
  address: Address;

  constructor (props: ClinicProps) {
    this.id = props.id
    this.name = props.name
    this.cpf = props.cpf
    this.address = props.address
  }
}
