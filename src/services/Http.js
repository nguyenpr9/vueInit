import axios from 'axios'
import { AuthService } from '@services/auth.service'

export class Http {
  constructor({ auth, baseUrl }) {
    this.isAuth = auth || false
    this.instance = axios.create({
      baseURL: baseUrl,
    })
    return this.init()
  }

  init() {
    if (this.isAuth) {
      this.instance.interceptors.request.use(
        (request) => {
          request.headers.authorization = AuthService.getBearer()
          if (
            AuthService.isAccessTokenExpired() &&
            AuthService.hasRefreshToken()
          ) {
            return AuthService.debounceRefreshTokens()
              .then((response) => {
                AuthService.setBearer(response.data.accessToken)
                request.headers.authorization = AuthService.getBearer()
                return request
              })
              .catch((error) => Promise.reject(error))
          } else {
            return request
          }
        },
        (error) => {
          return Promise.reject(error)
        }
      )

      this.instance.interceptors.response.use(null, (error) => {
        if (
          error.response &&
          error.response.status &&
          [401, 403].includes(error.response.status)
        ) {
          // logout
        }
        return Promise.reject(error)
      })
    }

    return this.instance
  }
}
