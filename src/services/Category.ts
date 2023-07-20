import React from 'react'
import { CategoryPayload } from '../interfaces/Category'
import { useAppSelector } from '../redux/redux-hooks'
import { tenantId } from '../utilities/constant'
import network from '../utilities/network'
import { AxiosResponse } from 'axios'

const CategoryList = () => {
  return network.get(`homemenu/list/${tenantId}`)
}
const SubCategory = (menuId: string | null) => {
  return network.get(`homemenu/view/${tenantId}/${menuId}`)
}
export default {
  CategoryList,
  SubCategory,
}
