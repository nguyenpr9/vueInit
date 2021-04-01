import { AbstractRepo } from '@services/core/AbstractRepo'

export class OrdersService extends AbstractRepo {
  static get entity() {
    return 'users'
  }

  static async getCurrent() {
    try {
      const response = await this.callApi(true).get(`${this.entity}/current`)
      return new this.ResWrapper(response, response.data.data)
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText
      throw new this.ErrWrapper(error, message)
    }
  }
}
