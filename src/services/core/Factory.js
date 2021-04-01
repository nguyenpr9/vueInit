import { OrdersService } from './orders.service'
const userService = new OrdersService()
const repositories = {
  user: userService,
}
export default {
  get: (name) => repositories[name],
}
