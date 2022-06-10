import { IRoleResp } from './accounts'

export interface IOrganisationResp {
  organisationList: IOrganisation[]
}

export interface IOrganisation {
  image: string
  name: string
  organisationId: number
  otherRoleIds: IRoleResp[]
  role: string
  roleId: number
}
