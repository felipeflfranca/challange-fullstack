import 'dotenv/config'
import axios from 'axios'
import { Router } from 'express'
import Logger from '../config/logger'

export const address = Router()

export type Address = {
  place?: string
  number?: string
  district?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  lat?: number
  lng?: number
}

address.get('/search', async (req, res) => {
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
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAPS_KEY}`
  }).then((response) => {
    const data = response.data

    if (data.status === 'OK') {
      const { address_components, geometry } = data.results[0]

      const addressModel: Address = {}

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
})
