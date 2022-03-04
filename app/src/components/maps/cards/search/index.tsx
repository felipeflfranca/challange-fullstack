import * as React from 'react'
import { useSnackbar } from 'notistack'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import { searchByAddress } from '../../../../utils/googleSearch'

type Props = {
    setLatitude: (value: number|null) => void;
    setLongitude: (value: number|null) => void;
    setZoom: (value: number) => void;
}

export const Search = (props: Props) => {
  const { setLatitude, setLongitude, setZoom } = props

  const [address, setAddress] = React.useState<string>('')

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const searchAddress = () => {
    searchByAddress(address).then((response) => {
      const data = response.data

      if (data.status === 'OK') {
        const { formatted_address, geometry } = data.results[0]

        setLatitude(geometry.location.lat)
        setLongitude(geometry.location.lng)
        setZoom(11)

        setAddress(formatted_address)
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

  return (
    <Paper component="form" sx={{ width: '100%' }}>
      <InputBase
        sx={{ ml: 1, flex: 1, width: '85%' }}
        placeholder="Endereço"
        inputProps={{
          'aria-label': 'Endereço'
        }}
        onChange={(e) => setAddress(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="Buscar" onClick={searchAddress}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
