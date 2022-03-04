import axios from 'axios'
import Address from '../../src/entities/Adress'
import Clinic from '../../src/entities/Clinic'

// Errado
describe('Register', () => {
  test('The /api/clinics route must save the clinic data and return it with the id', () => {
    const address: Address = {
      place: 'Av. Roberto Delphino',
      number: '191',
      district: 'Lot. Aida Haddad Jafet',
      city: 'Itatiba',
      postalCode: '13256577',
      state: 'São Paulo',
      country: 'Brasil',
      lat: -1000,
      lng: -10340
    }

    const clinicJson: Clinic = {
      name: 'Pelé',
      cnpj: '56138496000119',
      address: address
    }

    axios({
      method: 'post',
      url: 'localhost:3001/api/clinics',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(clinicJson)
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })

    expect(clinicJson.cnpj).toBe('56138496000119')
  })
})
