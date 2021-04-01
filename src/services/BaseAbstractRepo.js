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
  /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */

  static callApi(auth = false) {
    return new Http({ auth, baseUrl: this.baseUrl })
  }

  static ResWrapper(...rest) {
    return new ResponseWrapper(...rest)
  }

  static ErrWrapper(...rest) {
    return new ErrorWrapper(...rest)
  }
}
