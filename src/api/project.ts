import { ApiUrl } from 'src/constants/url'
import http from 'src/lib/http'
import { ResponseType } from 'src/types/api'
import { IProjectResp, ITaskReq, ITaskResp } from 'src/types/project'

export const getProjectList = (organisationId?: string | number, isTracker?: boolean) => {
  const data = {
    isTracker: isTracker || true,
    organisationId: organisationId,
  }
  return http.post<ResponseType<IProjectResp>, ResponseType<IProjectResp>>(ApiUrl.getProjectList, data)
}

export const getTaskList = (data:ITaskReq) => {
  const reqData = {
    isTracker: data.isTracker || false,
    projectId: Number(data.projectId),
    organisationId: Number(data.organisationId),
  }
  return http.post<ResponseType<ITaskResp>, ResponseType<ITaskResp>>(ApiUrl.getTaskList, reqData)
}
