import axios from 'axios'
import $store from '@state/store'
import { AuthService } from '@services/auth.service'

export class Http {
  constructor({ auth, baseUrl }) {
    this.isAuth = auth
    this.instance = axios.create({
      baseURL: baseUrl,
    })
    return this.init()
  }

  init() {
    if (this.isAuth) {
      this.instance.interceptors.request.use(
        (request) => {
          request.headers.authorization = `Bearer ${$store.state.auth.token}`
          if (
            $store.getters['auth/isTokenExp'] &&
            $store.getters['auth/hasRefreshToken']
          ) {
            AuthService.debounceRefreshTokens()
            return request
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
