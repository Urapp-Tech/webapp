import devNetwork from '../utilities/devNetwork'

export interface NewOrder {
  cartId: string
}
const addOrder = (data: NewOrder) => {
  return devNetwork.post(`appOrder/newOrder`, data)
}

export default {
  addOrder,
}
