/* import * as Fingerprint2 from 'fingerprintjs2'
import * as UAParser from 'ua-parser-js' */

import $store from '@state/store'
import { BaseAbstractRepo } from '@services/BaseAbstractRepo'

export class AuthService extends BaseAbstractRepo {
  static get baseUrl() {
    return `${process.env.VUE_APP_URL_API}/auth`
  }

  /**
   ******************************
   * @API
   ******************************
   */

  static async makeLogin({ username, password }) {
    try {
      const basic = btoa(`${username}:${password}`)
      // const fingerprint = await _getFingerprint()
      const response = await this.callApi(false).get(
        `login`,
        {
          headers: {
            Authorization: `Basic ${basic}`,
          },
        },
        { withCredentials: true }
      )
      return this.ResWrapper(response, response.data.data)
    } catch (error) {
      throw this.ErrWrapper(error)
    }
  }

  static async getMe() {
    try {
      const response = await this.callApi().get(`me`)
      return this.ResWrapper(response, response.data.data)
    } catch (error) {
      throw this.ErrWrapper(error)
    }
  }

  static async makeLogout() {
    try {
      const response = await this.callApi(true).delete('logout')
      return this.ResWrapper(response, response.data.data)
    } catch (error) {
      throw this.ErrWrapper(error)
    }
  }

  static async refreshTokens() {
    try {
      const response = await this.callApi().get(`refresh`)
      return this.ResWrapper(response, response.data.data)
    } catch (error) {
      throw this.ErrWrapper(error)
    }
  }

  static debounceRefreshTokens = this._debounce(() => {
    return $store.dispatch('auth/refreshTokens')
  }, 100)

  /**
   ******************************
   * @METHODS
   ******************************
   */

  /**
   * https://stackoverflow.com/questions/35228052/debounce-function-implemented-with-promises
   * @param inner
   * @param ms
   * @returns {function(...[*]): Promise<unknown>}
   * @private
   */
  static _debounce(inner, ms = 0) {
    let timer = null
    let resolves = []

    return function() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const result = inner()
        resolves.forEach((r) => r(result))
        resolves = []
      }, ms)

      return new Promise((resolve) => resolves.push(resolve))
    }
  }
}

/**
 ******************************
 * @private_methods
 ******************************
 */

/* function _getFingerprint () {
  return new Promise((resolve, reject) => {
    async function getHash () {
      const options = {
        excludes: {
          plugins: true,
          localStorage: true,
          adBlock: true,
          screenResolution: true,
          availableScreenResolution: true,
          enumerateDevices: true,
          pixelRatio: true,
          doNotTrack: true,
          preprocessor: (key, value) => {
            if (key === 'userAgent') {
              const parser = new UAParser(value)
              // return customized user agent (without browser version)
              return `${parser.getOS().name} :: ${parser.getBrowser().name} :: ${parser.getEngine().name}`
            }
            return value
          }
        }
      }

      try {
        const components = await Fingerprint2.getPromise(options)
        const values = components.map(component => component.value)
        console.log('fingerprint hash components', components)

        return String(Fingerprint2.x64hash128(values.join(''), 31))
      } catch (e) {
        reject(e)
      }
    }

    if (window.requestIdleCallback) {
      console.log('get fp hash @ requestIdleCallback')
      requestIdleCallback(async () => resolve(await getHash()))
    } else {
      console.log('get fp hash @ setTimeout')
      setTimeout(async () => resolve(await getHash()), 500)
    }
  })
} */
