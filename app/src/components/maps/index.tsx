/* eslint-disable no-undef */

import * as React from 'react'
import Grid from '@mui/material/Grid'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import { Search } from './cards/search'
import { RegistrationForm } from './cards/registration_form'
import axios from 'axios'

import List from '@mui/material/List'
import { ClinicCard } from './cards/ClinicCard'

interface Address {
  place: string
  number: string
  district: string
  postalCode: string
  city: string
  state: string
  country: string
  lat: number
  lng: number
}
interface Clinic {
  id?: number
  name: string
  cnpj: string
  address: Address
}

const containerStyle = {
  width: '100%',
  height: '100vh'
}

type Props = {
  apiKey: string
}

export const Maps = (props: Props) => {
  const [latitude, setLatitude] = React.useState<number|null>(null)
  const [longitude, setLongitude] = React.useState<number|null>(null)

  const [navigatorGeoLat, setNavigatorGeoLat] = React.useState<number>(-14.2400732)
  const [navigatorGeoLng, setNavigatorGeoLng] = React.useState<number>(-53.1805017)
  const [zoom, setZoom] = React.useState<number>(5)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setNavigatorGeoLat(position.coords.latitude)
      setNavigatorGeoLng(position.coords.longitude)
      setZoom(8)
    })
  }

  const [clinics, setClinics] = React.useState<Array<Clinic>>([])

  const getAllClinics = () => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_SERVER_HOST}/api/clinics`,
      headers: { }
    })
      .then(function (response) {
        if (response.data.length > 0) {
          setClinics(response.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  React.useEffect(() => {
    getAllClinics()
  }, [])

  return (
    <div className="map">
      <LoadScript googleMapsApiKey={'AIzaSyA6f15OazdjiJmAl21BlZk-DrWckCawpl0'} >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude ?? navigatorGeoLat, lng: longitude ?? navigatorGeoLng }}
          zoom={zoom}
        >
          <Grid container spacing={2}>
            {/* Address search desktop version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'none', md: 'block' }, right: 0, position: 'absolute', width: '100%', marginRight: 1, marginTop: 1 }} >
              <Search
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setZoom={setZoom}
              />
            </Grid>

            {/* Address search mobile version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'block', md: 'none' }, marginTop: 1, position: 'absolute', width: '100%', marginLeft: 1 }} >
              <Search
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setZoom={setZoom}
              />
            </Grid>

            {/* Form desktop version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', width: '100%', marginLeft: 3 }}>
              <RegistrationForm
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setZoom={setZoom}
                getAllClinics={getAllClinics}
              />
            </Grid>

            {/* Form mobile version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', marginTop: 7, width: '100%', marginLeft: 3, padding: 2 }}>
              <RegistrationForm
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setZoom={setZoom}
                getAllClinics={getAllClinics}
              />
            </Grid>

            {clinics.length > 0
              ? <>
                  <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ bottom: 0, position: 'absolute', maxHeight: '340px', height: '50vw', marginLeft: 3, overflowX: 'hidden', overflowY: 'scroll', backgroundColor: '#fff', width: '100%' }}>
                    <List sx={{ mb: 2, width: '100%' }}>
                      {clinics.map((clinic: Clinic) => <ClinicCard {...clinic} key={`card-${clinic.id}`}/>)}
                    </List>
                  </Grid>
                </>
              : ''}

          </Grid>

          {clinics.map((clinic: Clinic) => {
            return (
              <Marker
                key={`marker-${clinic.id}`}
                position={{ lat: clinic.address.lat, lng: clinic.address.lng }}
              />
            )
          })}

          {latitude && longitude
            ? <Marker
                position={{ lat: latitude, lng: longitude }}
                icon="http://localhost:3000/marker.png"
              />
            : ''}

        </GoogleMap>
      </LoadScript>
    </div>
  )
}
