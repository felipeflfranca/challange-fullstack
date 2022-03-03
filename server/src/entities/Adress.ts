interface AddressProps {
  place?: string
  number?: string
  district?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  lat?: string
  lng?: string
}

export default class Address {
  place?: string
  number?: string
  district?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  lat?: string
  lng?: string

  constructor (props: AddressProps) {
    this.place = props.place
    this.number = props.number
    this.district = props.district
    this.postalCode = props.postalCode
    this.city = props.city
    this.state = props.state
    this.country = props.country
    this.lat = props.lat
    this.lng = props.lng
  }
}
