import axios from 'axios'
import { ResponseWrapper, ErrorWrapper } from '@utils/wrapResponse'
import { Http } from './Http'

export class BaseAbstractRepo {
  constructor() {
    if (this.constructor === BaseAbstractRepo) {
      throw new Error('FYI: Instance of Abstract class cannot be instantiated')
    }
  }

  static get baseUrl() {
    throw new Error('baseUrl getter not defined')
  }

  static get baseHeader() {
    return {}
  }
  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */

  static callApi(auth = true) {
    if (typeof this.baseHeader === 'object') {
      for (const [k, v] of Object.entries(this.baseHeader)) {
        axios.defaults.headers.common[k] = v
      }
    }
    return new Http({ auth, baseUrl: this.baseUrl })
  }

  static ResWrapper(...rest) {
    return new ResponseWrapper(...rest)
  }

  static ErrWrapper(...rest) {
    return new ErrorWrapper(...rest)
  }
}
