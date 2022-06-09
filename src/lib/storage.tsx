const STORAGE_KEY = {
  AUTH_ACCESS_TOKEN: '@BUSTLESPOT_AUTH_ACCESS_TOKEN',
}

export const updateAuthToken = (token: string) => {
  localStorage.setItem(STORAGE_KEY.AUTH_ACCESS_TOKEN, token)
}

export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEY.AUTH_ACCESS_TOKEN)
}
