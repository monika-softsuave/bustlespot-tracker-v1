import { getAuthToken } from './storage'

export const isUserAuthorized = (): boolean => {
  return Boolean(getAuthToken())
}
