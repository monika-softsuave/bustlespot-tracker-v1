import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Avatar } from '@mui/material'
import { Button, ButtonContainer, ImageContainer, Paper, Title, TitleContainer } from './index.styled'
import { IOrganisation } from 'src/types/organization'
import { useNavigate } from 'react-router'
interface Props {
  organization: IOrganisation
}

function List({ organization }: Props) {
  const { image, name, organisationId } = organization
  const navigate = useNavigate()

  return (
    <Paper elevation={5}>
      <ImageContainer>
        <Avatar alt='Remy Sharp' src={image} />
      </ImageContainer>
      <TitleContainer>
        <Title>{name}</Title>
      </TitleContainer>
      <ButtonContainer>
        <Button onClick={() => navigate(`/tracker/${organisationId}`)} variant='text'>
          <ChevronRightIcon />
        </Button>
      </ButtonContainer>
    </Paper>
  )
}

export default List
