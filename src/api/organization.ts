import { ApiUrl } from 'src/constants/url'
import http from 'src/lib/http'
import { IOrganisationResp } from 'src/types/organization'
import { ResponseType } from 'src/types/api'

export const getOrgainzation = () => {
  return http.get<ResponseType<IOrganisationResp>, ResponseType<IOrganisationResp>>(ApiUrl.getOrganization)
}
