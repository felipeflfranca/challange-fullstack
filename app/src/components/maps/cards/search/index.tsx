import * as React from 'react'

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

type Props = {
  apiKey?: string
}

export const Search = (props: Props) => {
  console.log(props)
  return (
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
}
