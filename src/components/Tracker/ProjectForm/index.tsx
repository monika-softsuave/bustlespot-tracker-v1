import React, { useState, useEffect } from 'react'
import { CircularProgress, Grid, TextField } from '@mui/material'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router'
import { getProjectList, getTaskList } from 'src/api/project'
import { Autocomplete, ValueType } from 'src/components/Autocomplete'
import { QueryKey } from 'src/constants/queryKey'
import { getOptions } from 'src/lib/util'
import { IOption } from 'src/types/common'
import { ITaskReq, ITaskResp } from 'src/types/project'
import { ResponseType } from 'src/types/api'
import { Wrapper } from './index.styled'
import { trackerContents } from 'src/contents/screens/tracker'

interface FormData {
  project: IOption | null
  task: IOption | null
  note: string
}
const intialState = {
  project: null,
  task: null,
  note: '',
}

function ProjectForm() {
  const params = useParams()
  const { data: response, isLoading } = useQuery(QueryKey.GET_PROJECTLIST + params.organizationId, () =>
    getProjectList(params.organizationId),
  )
  const getTaskListMutation = useMutation<ResponseType<ITaskResp>, Error, ITaskReq, unknown>(
    QueryKey.GET_TASKLIST,
    getTaskList,
  )
  const projectLists = getOptions(response?.data.data.projectLists || [], 'projectId')
  const taskList = getOptions(getTaskListMutation?.data?.data.data.taskList || [], 'taskId')
  const [formData, setFormData] = useState<FormData>(intialState)

  useEffect(() => {
    const requestBody = {
      projectId: formData.project?.value || '',
      organisationId: params.organizationId || '',
    }
    formData.project && getTaskListMutation.mutate(requestBody)

  }, [formData.project, params.organizationId])

  
  useEffect(() => {
    setFormData({ ...formData, task: null })
  }, [formData.project])

  const handleChange = (value: ValueType, name: string) => {
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Wrapper>
      {isLoading ? (
        <CircularProgress color='secondary' />
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Autocomplete
              label={trackerContents.project}
              options={projectLists}
              value={formData.project}
              fullWidth
              disabled={getTaskListMutation.isLoading || isLoading}
              onChange={(value) => handleChange(value, 'project')}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              label={trackerContents.task}
              options={taskList}
              value={formData.task}
              fullWidth
              disabled={getTaskListMutation.isLoading || isLoading}
              onChange={(value) => handleChange(value, 'task')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={trackerContents.Note}
              value={formData.note}
              fullWidth
              placeholder={trackerContents.notePlaceholder}
              disabled={getTaskListMutation.isLoading || isLoading}
              onChange={(event) => handleChange(event.target.value, 'note')}
            />
          </Grid>
        </Grid>
      )}
    </Wrapper>
  )
}

export default ProjectForm
