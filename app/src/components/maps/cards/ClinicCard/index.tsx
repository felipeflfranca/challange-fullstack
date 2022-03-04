import * as React from 'react'
import Typography from '@mui/material/Typography'
import Address from '../../../../entities/Adress'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

type Props = {
  name: string,
  address: Address
}

export const ClinicCard = (props: Props) => {
  return (
    <ListItem button key={`card-${props.name}`} sx={{ border: '1px solid #cecece', ml: 0, mr: 1, width: '97%' }}>
      <ListItemText primary={props.name} secondary={(
        <>
          <Typography variant="body2" color="text.secondary">
            {`${props.address.place} ${props.address.number} ${props.address.district} ${props.address.postalCode} ${props.address.city} ${props.address.state} ${props.address.country}`}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {`${props.address.lat}, ${props.address.lng} `}
          </Typography>
        </>
      )} />
    </ListItem>
  )
}
