import { useAuthStore } from '@/stores'
import { getRefreshToken, getUser } from '@/@core/services/JwtService'

export const isUserLoggedIn = () => !!(window.localStorage.getItem('token'))

export const refreshToken = () => {
  useAuthStore().refreshToken({ refresh: getRefreshToken() })
}

export const isTokenValid = () => {
  return (getUser().exp < Date.now()/1000)  ? false : true
}
