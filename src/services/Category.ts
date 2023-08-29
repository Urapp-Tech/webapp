import { tenantId } from '../utilities/constant'
import devNetwork from '../utilities/devNetwork'
import network from '../utilities/network'

const CategoryList = () => {
  return network.get(`homemenu/list/${tenantId}`)
}
const SubCategory = (menuId: string | null) => {
  return network.get(`homemenu/view/${tenantId}/${menuId}`)
}
const FaqService = (tenantId: string, menuId: string, submenuId: string) => {
  return network.get(`homemenu/view/submenu/${tenantId}/${menuId}/${submenuId}`)
}
export default {
  CategoryList,
  SubCategory,
  FaqService,
}
