import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Avatar } from '@mui/material'
import { Button, ButtonContainer, ImageContainer, Paper, Title, TitleContainer } from './index.styled'
import { IOrganisation } from 'src/types/organization'

interface Props {
  organization: IOrganisation
}
function List({ organization }: Props) {
  return (
    <Paper elevation={5}>
      <ImageContainer>
        <Avatar alt='Remy Sharp' src={organization.image} />
      </ImageContainer>
      <TitleContainer>
        <Title>{organization.name}</Title>
      </TitleContainer>
      <ButtonContainer>
        <Button variant='text'>
          <ChevronRightIcon />
        </Button>
      </ButtonContainer>
    </Paper>
  )
}

export default List
