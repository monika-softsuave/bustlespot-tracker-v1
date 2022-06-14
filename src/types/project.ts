import { IList } from './common'

export interface IProjectResp {
  projectLists: IProject[]
}
export interface IProject extends IList {
  name: string
  projectId: string | number
  startDate: string
  status: number
}

export interface ITaskReq {
  projectId: string | number
  organisationId: string | number
  isTracker?: boolean
}

export interface ITaskResp {
  taskList: ITask[]
}

export interface ITask extends IList {
  name: string
  createdBy: number
  description: String
  taskId: number
}
