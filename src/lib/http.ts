import axios from 'axios'
import { get } from 'lodash'
import { commonContents } from 'src/contents/common'

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

export default http
