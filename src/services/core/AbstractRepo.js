import { BaseAbstractRepo } from '@services/BaseAbstractRepo'

export class AbstractRepo extends BaseAbstractRepo {
  constructor() {
    super()
    if (this.constructor === BaseAbstractRepo) {
      throw new Error('FYI: Instance of Abstract class cannot be instantiated')
    }
  }

  static get baseUrl() {
    return `https://facebook.com/`
  }

  static get entity() {
    throw new Error('entity getter not defined')
  }

  /**
   * ------------------------------
   * @API_CALLS_PUBLIC
   * ------------------------------
   */

  /**
   * ------------------------------
   * @API_CALLS_PRIVATE
   * ------------------------------
   */

  static async fetchAll(params) {
    try {
      const response = await this.callApi().post(`${this.entity}`, params)
      return new this.ResWrapper(response, response.data.data)
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText
      throw new this.ErrWrapper(error, message)
    }
  }

  static async fetchOne(id) {
    try {
      const response = await this.callApi().get(`${this.entity}/${id}`)
      return new this.ResWrapper(response, response.data.data)
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText
      throw new this.ErrWrapper(error, message)
    }
  }

  static async create(params) {
    try {
      const response = await this.callApi().post(`${this.entity}`, params)
      return new this.ResWrapper(response, response.data.data)
    } catch (error) {
      throw new this.ErrWrapper(error)
    }
  }

  static async update(id, params) {
    try {
      const response = await this.callApi().patch(
        `${this.entity}/${id}`,
        params
      )
      return new this.ResWrapper(response, response.data.data)
    } catch (error) {
      throw new this.ErrWrapper(error)
    }
  }

  static async remove(id) {
    try {
      const response = await this.callApi().delete(`${this.entity}/${id}`)
      return new this.ResWrapper(response, response.data.data)
    } catch (error) {
      throw new this.ErrWrapper(error)
    }
  }
}
