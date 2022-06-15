import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

export type GoogleLoginEvent = GoogleLoginResponse | GoogleLoginResponseOffline
export type MouseEvent = React.MouseEventHandler<HTMLButtonElement> | undefined
export type AutoselectEvent = React.SyntheticEvent
