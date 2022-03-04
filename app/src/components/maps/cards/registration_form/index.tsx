import * as React from 'react'

import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'

import axios from 'axios'
import { useSnackbar } from 'notistack'

import { cnpjMask, cnpjClear } from '../../../../utils/cnpjFormat'
import Address from '../../../../model/Adress'

type Props = {
  setLatitude: (value: number|null) => void;
  setLongitude: (value: number|null) => void;
  setZoom: (value: number) => void;
  latitude: number|null;
  longitude: number|null;
}

export const RegistrationForm = (props: Props) => {
  const { latitude, longitude, setLatitude, setLongitude, setZoom } = props

  const [name, setName] = React.useState<string>('')
  const [cnpj, setCnpj] = React.useState<string>('')
  const [address, setAddress] = React.useState<string>('')
  const [googleAddress, setGoogleAddress] = React.useState<Address|null>(null)
  const [registerEnable, handleRegisterEneble] = React.useState<boolean>(false)

  const infoMessageDefault = 'Preencha todos os campos para habilitar o cadastro *'

  const [infoMessage, setInfoMessage] = React.useState<string>(infoMessageDefault)

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const googleSearch = async () => {
    await axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_APIKEY}`
    }).then((response) => {
      const data = response.data

      if (data.status === 'OK') {
        const { address_components, formatted_address, geometry } = data.results[0]

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
            case 'political':
              addressModel.district = value
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

        setGoogleAddress(addressModel)

        setAddress(formatted_address)

        setLatitude(geometry.location.lat)
        setLongitude(geometry.location.lng)
        setZoom(10)

        handleRegisterEneble(true)
        setInfoMessage('')
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

  const clearFields = () => {
    setName('')
    setCnpj('')
    setAddress('')
    setGoogleAddress({})
    setLatitude(null)
    setLongitude(null)
    setZoom(10)
    handleRegisterEneble(false)
    setInfoMessage(infoMessageDefault)
  }

  const saveClinic = () => {
    const clinicData = {
      apikey: process.env.REACT_APP_INTEGRATION_APIKEY,
      name,
      cnpj: cnpjClear(cnpj),
      address: googleAddress
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/api/clinics`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(clinicData)
    })
      .then(function () {
        enqueueSnackbar('Cadastro realizado com sucesso', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          action: <CancelIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => { closeSnackbar() }}/>
        })
        clearFields()
      })
      .catch(function (error) {
        let message = 'Não foi possível realizar o cadastro. Contate o administrador.'

        if (error.response) {
          message = error.response.data.message
          setInfoMessage(`${message} - Adicione o campo e refaça a busca para recalcular latitude/longitude e habilitar o cadastro *`)
        }

        enqueueSnackbar(message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          action: <CancelIcon sx={{ color: '#fff', cursor: 'pointer' }} onClick={() => { closeSnackbar() }}/>
        })

        setAddress('')
        handleRegisterEneble(false)
      })
  }

  return (
    <Grid container spacing={2} sx={{ marginTop: 1 }}>
      <Paper
        component="form"
        sx={{
          width: '100%',
          padding: '10px'
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: '10px' }}>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            Cadastro de clinica
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: '15px' }}>
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="standard"
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: '15px' }}>
          <TextField
            id="outlined-basic"
            label="CNPJ"
            variant="standard"
            size="small"
            inputProps={{ maxLength: 18 }}
            value={cnpjMask(cnpj)}
            onChange={(e) => {
              setCnpj(e.target.value)
            }}
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
              <Button variant="text" sx={{ right: '10px' }} fullWidth onClick={googleSearch}>Buscar</Button>
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
                value={latitude ?? ''}
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
                value={longitude ?? ''}
                size="small"
                disabled
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ pt: '15px' }}>
          <Button variant="contained" size="large" fullWidth onClick={saveClinic} disabled={!registerEnable}>
            CADASTRAR
          </Button>

          {!registerEnable
            ? <Typography variant="h6" component="h5" sx={{ textAlign: 'center', fontSize: '14px', pt: 1 }}>
                {infoMessage}
              </Typography>
            : ''}
        </Grid>
      </Paper>
    </Grid>
  )
}
