
import * as React from 'react'
import Grid from '@mui/material/Grid'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

import { Search } from './cards/search'
import { RegistrationForm } from './cards/registration_form'
import { Card } from './cards/card'

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
      setZoom(10)
    })
  }

  return (
    <div className="map">
      <LoadScript googleMapsApiKey={props.apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude ?? navigatorGeoLat, lng: longitude ?? navigatorGeoLng }}
          zoom={zoom}
        >
          <Grid container spacing={2}>
            {/* Address search desktop version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'none', md: 'block' }, right: 0, position: 'absolute', width: '100%', marginRight: 1, marginTop: 1 }} >
              <Search />
            </Grid>

            {/* Address search mobile version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'block', md: 'none' }, marginTop: 45, position: 'absolute', width: '100%', marginLeft: 1 }} >
              <Search />
            </Grid>

            {/* Form desktop version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', width: '100%', marginLeft: 3 }}>
              <RegistrationForm
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setZoom={setZoom}
              />
            </Grid>

            {/* Form mobile version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', width: '100%', marginLeft: 3, padding: 2 }}>
              <RegistrationForm
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                setZoom={setZoom}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ position: 'absolute', width: '100%', marginLeft: 3, padding: 2 }}>
              <Card />
            </Grid>
          </Grid>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}
