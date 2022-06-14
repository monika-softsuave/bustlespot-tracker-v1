import { IRoleResp } from './accounts'
import { IList } from './common';

export interface IOrganisationResp {
  organisationList: IOrganisation[]
}

export interface IOrganisation extends IList {
  image: string
  name: string
  organisationId: number
  otherRoleIds: IRoleResp[]
  role: string
  roleId: number
}
