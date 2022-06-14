import { AuthLogin } from 'src/types/accounts'
import http from 'src/lib/http'
import { ApiUrl } from 'src/constants/url'

export const updateLogin = (data: AuthLogin) => {
  return http.post(ApiUrl.login, data, { params: { withoutAuth: true } })
}
