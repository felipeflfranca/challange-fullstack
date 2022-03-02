import Address from './Adress'

interface ClinicProps {
  id?: number;
  name: string;
  cnpj: string;
  address: Address;
}

export default class Clinic {
  id?: number;
  name: string;
  cnpj: string;
  address: Address;

  constructor (props: ClinicProps) {
    this.id = props.id
    this.name = props.name
    this.cnpj = props.cnpj
    this.address = props.address
  }
}
