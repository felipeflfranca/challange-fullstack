import axios from 'axios'

export const searchByAddress = (address: string) => {
  return axios({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_APIKEY}`
  })
}
