import devNetwork from '../utilities/devNetwork'

export interface NewOrder {
  cartId: string
}
const addOrder = (data: NewOrder) => {
  return devNetwork.post(`appOrder/newOrder`, data)
}
const orderList = () => {
  return devNetwork.get(`appOrder/webapp/list`)
}

const orderDetail = (id: string) => {
  return devNetwork.get(`appOrder/webapp/detail/${id}`)
}
export default {
  addOrder,
  orderList,
  orderDetail,
}
