import axios from 'axios'
import { Request, Response } from 'express'
import Logger from '../config/logger'
import ClinicRepository from '../services/repositories/ClinicRepository'
import ClinicInterface from '../services/interfaces/ClinicInterface'
import Address from '../entities/Adress'

export default class AddressController {
  private repository: ClinicInterface

  constructor () {
    this.repository = new ClinicRepository()
  }

  save = (req: Request, res: Response) => {
    res.json('Livro devolvido com sucesso!')
  }

  search = async (req: Request, res: Response) => {
    const { address } = req.query

    if (!address) {
      Logger.error('The address parameter was not informed')
      res.status(400).json({ message: 'O parâmetro address não foi informado' })
      return
    }

    if (!process.env.MAP_KEY || process.env.MAP_KEY === '') {
      Logger.error('Google Maps API keys not found')
      res.status(506).json({ message: 'Não foi possível realizar a pesquisa. Por favor contate o administrador.' })
      return
    }

    await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_APIKEY}`
    }).then((response) => {
      const data = response.data

      if (data.status === 'OK') {
        const { address_components, geometry } = data.results[0]

        let addressModel: Address

        const keys = Object.keys(address_components)
        keys.forEach((key) => {
          const type = address_components[key].types[0]
          const value = address_components[key].long_name

          switch (type) {
            case 'street_number':
              addressModel.number = value
              break
            case 'route':
              addressModel.place = value
              break
            case 'administrative_area_level_2':
              addressModel.city = value
              break
            case 'administrative_area_level_1':
              addressModel.state = value
              break
            case 'country':
              addressModel.country = value
              break
            case 'postal_code':
              addressModel.postalCode = value
              break
            default:
              break
          }
        })

        addressModel.lat = geometry.location.lat
        addressModel.lng = geometry.location.lng

        res.json(addressModel)
      } else {
        res.status(404).json({ message: 'Endereço não encontrado' })
      }
    })
  }

  all = (req: Request, res: Response) => {
    Logger.error('pesquisou all')
    res.json('Livro devolvido com sucesso!')
    // const result = ClinicRepository.getInstance().returnAll()
    // res.json(result)
  }
}
