/* eslint-disable no-undef */
import React, { useState } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'

import axios from 'axios'
import { useSnackbar } from 'notistack'

import './App.css'
import { cnpjMask } from './utils/cnpjFormat'

const containerStyle = {
  width: '100%',
  height: '100vh'
}

function App () {
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [address, setAddress] = useState('')
  const [googleAddress, setGoogleAdrress] = useState({})
  const [latitude, setLatitude] = useState<number|null>(null)
  const [longitude, setLongitude] = useState<number|null>()
  const [zoom, setZoom] = useState(5)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const [navigatorGeoLat, setNavigatorGeoLat] = useState(-14.2400732)
  const [navigatorGeoLng, setNavigatorGeoLng] = useState(-53.1805017)

  navigator.geolocation.getCurrentPosition(function (position) {
    setNavigatorGeoLat(position.coords.latitude)
    setNavigatorGeoLng(position.coords.longitude)
    setZoom(10)
  })

  const getAddress = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:3001/api/address/search',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ address })
    })
      .then(function (response) {
        const data = JSON.stringify(response.data)
        const dataObj = JSON.parse(data)

        if (dataObj.lat && dataObj.lng) {
          setGoogleAdrress(dataObj)

          setLatitude(dataObj.lat)
          setLongitude(dataObj.lng)
          setZoom(10)
        }
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          action: <CancelIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => { closeSnackbar() }}/>
        })
      })
  }

  const save = async () => {
    console.log(googleAddress)
  }

  const addressComponent = (
    <Paper component="form" sx={{ width: '100%' }}>
      <InputBase
        sx={{ ml: 1, flex: 1, width: '85%' }}
        placeholder="Endereço"
        inputProps={{
          'aria-label': 'Endereço'
        }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="Buscar">
        <SearchIcon />
      </IconButton>
    </Paper>
  )

  const registrationForm = (
    <Grid container spacing={2} sx={{ marginTop: 1 }}>
      <Paper
        component="form"
        sx={{
          width: '100%',
          padding: '10px'
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: '15px' }}>
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="standard"
            size="small"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: '15px' }}>
          <TextField
            id="outlined-basic"
            label="CNPJ"
            variant="standard"
            size="small"
            value={cnpjMask(cnpj)}
            onChange={(e) => { setCnpj(e.target.value) }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: 0 }}>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
              <TextField
                id="outlined-basic"
                label="Endereço"
                variant="standard"
                size="small"
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
                fullWidth
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Button variant="text" fullWidth onClick={getAddress}>Buscar</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: 0 }}>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                id="outlined-basic"
                label="Latitude"
                variant="standard"
                value={latitude}
                size="small"
                disabled
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                id="outlined-basic"
                label="Longitude"
                variant="standard"
                value={latitude}
                size="small"
                disabled
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: '15px' }}>
          <Button variant="contained" size="large" fullWidth onClick={save}>
            CADASTRAR
          </Button>
        </Grid>
      </Paper>
    </Grid>
  )

  const card = (
    <Card sx={{ maxWidth: 345, position: 'fixed', right: 0, bottom: 0, width: '100%', margin: '10px' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  )

  return (
    <div className="map">
      <LoadScript googleMapsApiKey="">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude ?? navigatorGeoLat, lng: longitude ?? navigatorGeoLng }}
          zoom={zoom}
        >
          <Grid container spacing={2}>
            {/* Address search desktop version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'none', md: 'block' }, right: 0, position: 'absolute', width: '100%', marginRight: 1, marginTop: 1 }} >
              {addressComponent}
            </Grid>

            {/* Address search mobile version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'block', md: 'none' }, marginTop: 45, position: 'absolute', width: '100%', marginLeft: 1 }} >
              {addressComponent}
            </Grid>

            {/* Form desktop version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', width: '100%', marginLeft: 3 }}>
              {registrationForm}
            </Grid>

            {/* Form mobile version */}
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', width: '100%', marginLeft: 3, padding: 2 }}>
              {registrationForm}
            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={4} xl={3} sx={{ position: 'absolute', width: '100%', marginLeft: 3, padding: 2 }}>
              {card}
            </Grid>
          </Grid>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default App
