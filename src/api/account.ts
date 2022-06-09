import { AuthLogin } from 'src/types/auth'
import http from 'src/lib/http'
import { ApiUrl } from 'src/constants/url'

export const updateLogin = (params: AuthLogin) => {
  return http.post(ApiUrl.login, params)
}
