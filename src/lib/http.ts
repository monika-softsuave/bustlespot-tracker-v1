import axios, { AxiosRequestConfig } from 'axios'
import { get, omit } from 'lodash'
import { commonContents } from 'src/contents/common'
import { getAuthToken } from './storage'

const baseUrl = process.env.REACT_APP_BASE_URL

export const getErrorMessage = (error: unknown) => {
  return get(error, 'response.data.message') || commonContents.generalNetworkErrorMessage
}

export const getSuccessMessage = (response: unknown) => {
  return get(response, 'data.message') || commonContents.generalSuccesMessage
}

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-type': 'application/json',
  },
})

http.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (!config?.params?.withoutAuth) {
      config.headers.authorization = 'token ' + getAuthToken()
    }

    config.params = omit(config.params, 'withoutAuth')
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default http
