import React from 'react'
import { useQuery } from 'react-query'
import { isEmpty } from 'lodash'
import { CircularProgress, Typography } from '@mui/material'
import { getOrgainzation } from 'src/api/organization'
import { QueryKey } from 'src/constants/queryKey'
import { IOrganisation } from 'src/types/organization'
import List from './List'
import { Wrapper } from './index.styled'

export function Organization() {
  const { data: response, isLoading } = useQuery(QueryKey.GET_ORGANIZATIONS, getOrgainzation)
  const organizationList = response?.data.data.organisationList

  return (
    <Wrapper>
      {isLoading ? (
        <CircularProgress color='secondary' />
      ) : organizationList && isEmpty(organizationList) ? (
        <Typography>No organization found</Typography>
      ) : (
        organizationList.map((organization: IOrganisation) => (
          <React.Fragment key={organization.organisationId}>
            <List organization={organization} />
          </React.Fragment>
        ))
      )}
    </Wrapper>
  )
}
